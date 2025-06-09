"use client"

import type React from "react"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchSolutions, updateSolution, deleteSolution } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import AddSolutionDialog from "@/components/dashboard/add-solution-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomPagination } from "@/components/shared/pagination"

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const queryClient = useQueryClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingSolution, setEditingSolution] = useState<any>(null)
  const [editFormData, setEditFormData] = useState({ solutionName: "", solutionDescription: "" })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const { data: solutionsData, isLoading } = useQuery({
    queryKey: ["solutions"],
    queryFn: () => fetchSolutions(currentPage, 6),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteSolution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solutions"] })
      toast.success("Solution deleted successfully")
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete solution")
    },
  })

  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: any }) => updateSolution(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solutions"] })
      toast.success("Solution updated successfully")
      setIsEditDialogOpen(false)
      setEditingSolution(null)
      setEditFormData({ solutionName: "", solutionDescription: "" })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || "Failed to update solution")
    },
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditClick = (solution: any) => {
    setEditingSolution(solution)
    setEditFormData({
      solutionName: solution.solutionName,
      solutionDescription: solution.solutionDescription
    })
    setIsEditDialogOpen(true)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editFormData.solutionName || !editFormData.solutionDescription) {
      toast.error("Please fill in all required fields")
      return
    }

    const data = {
      solutionName: editFormData.solutionName,
      solutionDescription: editFormData.solutionDescription
    }

    updateMutation.mutate({ id: editingSolution._id, data })
    queryClient.invalidateQueries({ queryKey: ["solutions"] })
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const solutions = solutionsData?.data || []
  const pagination = solutionsData?.pagination

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solutions</h1>
          <p className="text-gray-600 mt-1">Dashboard &gt; Solutions</p>
        </div>
        <AddSolutionDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-xl font-semibold">Solutions</h2>
        </CardHeader>
        <CardContent className="p-0">
          {solutions.length === 0 ? (
            <div className="text-gray-600 font-medium text-center py-5">No solutions found</div>
          ) : (
            <div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/5">Solution</TableHead>
                    <TableHead className="w-1/5 text-center">Added</TableHead>
                    <TableHead className="w-1/5 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {solutions.map((solution: any) => (
                    <TableRow key={solution._id}>
                      <TableCell>
                        <div className="font-medium text-gray-900">{solution.solutionName}</div>
                        <div className="text-sm text-gray-600 line-clamp-2">{solution.solutionDescription}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(solution.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(solution)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the solution.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(solution._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">

                <CustomPagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  perPage={pagination.itemsPerPage}
                  totalItems={pagination.totalItems}
                  onPageChange={handlePageChange}
                />

              </div>
            </div>

          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Solution</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-solutionName">Solution Name</Label>
                <Input
                  id="edit-solutionName"
                  name="solutionName"
                  value={editFormData.solutionName}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-solutionDescription">Description</Label>
                <Textarea
                  id="edit-solutionDescription"
                  name="solutionDescription"
                  value={editFormData.solutionDescription}
                  onChange={handleEditInputChange}
                  rows={6}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Updating..." : "Update Solution"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}