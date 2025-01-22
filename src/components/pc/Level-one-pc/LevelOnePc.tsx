"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type React from "react"
import { useState } from "react"

interface EmployeeInfo {
  name: string
  number: string
  designation: string
  department: string
}

interface EmployeeInfoCardProps {
  employee: EmployeeInfo
}

const EmployeeInfoCard: React.FC<EmployeeInfoCardProps> = ({ employee }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <p className="font-semibold">{employee.name}</p>
            <p>#{employee.number}</p>
            <p>{employee.designation}</p>
            <p>{employee.department}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>Open Details</Button>
            </DialogTrigger>
          </Dialog>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="font-semibold">Name:</p>
              <p className="col-span-3">{employee.name}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="font-semibold">Number:</p>
              <p className="col-span-3">{employee.number}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="font-semibold">Designation:</p>
              <p className="col-span-3">{employee.designation}</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="font-semibold">Department:</p>
              <p className="col-span-3">{employee.department}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmployeeInfoCard
