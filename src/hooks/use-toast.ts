import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

interface ToasterToast extends ToastProps {
    id: string;
    title?: string;
    description?: React.ReactNode;
    action?: ToastActionElement;
}

interface State {
    toasts: ToasterToast[];
}

enum ActionTypes {
    ADD_TOAST = "ADD_TOAST",
    UPDATE_TOAST = "UPDATE_TOAST",
    DISMISS_TOAST = "DISMISS_TOAST",
    REMOVE_TOAST = "REMOVE_TOAST",
}

interface AddToastAction {
    type: ActionTypes.ADD_TOAST;
    toast: ToasterToast;
}

interface UpdateToastAction {
    type: ActionTypes.UPDATE_TOAST;
    toast: Partial<ToasterToast>;
}

interface DismissToastAction {
    type: ActionTypes.DISMISS_TOAST;
    toastId?: string;
}

interface RemoveToastAction {
    type: ActionTypes.REMOVE_TOAST;
    toastId?: string;
}

type Action =
    | AddToastAction
    | UpdateToastAction
    | DismissToastAction
    | RemoveToastAction;

const toastTimeouts = new Map<string, NodeJS.Timeout>();
const genId = (() => {
    let count = 0;
    return () => String(++count);
})();

const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) return;

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({ type: ActionTypes.REMOVE_TOAST, toastId });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.ADD_TOAST:
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };
        case ActionTypes.UPDATE_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === action.toast.id ? { ...t, ...action.toast } : t
                ),
            };
        case ActionTypes.DISMISS_TOAST: {
            const { toastId } = action;
            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.toasts.forEach((toast) => addToRemoveQueue(toast.id));
            }
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === toastId || toastId === undefined
                        ? { ...t, open: false }
                        : t
                ),
            };
        }
        case ActionTypes.REMOVE_TOAST:
            return {
                ...state,
                toasts: action.toastId
                    ? state.toasts.filter((t) => t.id !== action.toastId)
                    : [],
            };
    }
};

let memoryState: State = { toasts: [] };
const listeners: Array<(state: State) => void> = [];

const dispatch = (action: Action) => {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => listener(memoryState));
};

type Toast = Omit<ToasterToast, "id">;

const toast = ({ ...props }: Toast) => {
    const id = genId();
    const dismiss = () =>
        dispatch({ type: ActionTypes.DISMISS_TOAST, toastId: id });

    dispatch({
        type: ActionTypes.ADD_TOAST,
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open: boolean) => !open && dismiss(),
        },
    });

    return { id, dismiss };
};

const useToast = () => {
    const [state, setState] = React.useState<State>(memoryState);
    React.useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) listeners.splice(index, 1);
            toastTimeouts.forEach(clearTimeout);
            toastTimeouts.clear();
        };
    }, []);

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) =>
            dispatch({ type: ActionTypes.DISMISS_TOAST, toastId }),
    };
};

export { toast, useToast };
