"use client";

import type React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchServices, deleteService, updateService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Eye, Upload } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  // Edit state
  const [editingService, setEditingService] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    serviceTitle: "",
    serviceDescription: "",
    price: "",
  });
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  // View state
  const [viewingService, setViewingService] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: servicesData, isLoading } = useQuery({
    queryKey: ["services", currentPage],
    queryFn: () => fetchServices(currentPage, 10),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete service");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
      image,
    }: {
      id: string;
      data: any;
      image?: File;
    }) => updateService(id, data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated successfully");
      setIsEditDialogOpen(false);
      setEditingService(null);
      setEditFormData({ serviceTitle: "", serviceDescription: "", price: "" });
      setEditImage(null);
      setEditImagePreview(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update service");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleViewClick = (service: any) => {
    setViewingService(service);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (service: any) => {
    setEditingService(service);
    setEditFormData({
      serviceTitle: service.serviceTitle,
      serviceDescription: service.serviceDescription,
      price: service.price.toString(),
    });
    setEditImagePreview(service.imageLink);
    setEditImage(null);
    setIsEditDialogOpen(true);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !editFormData.serviceTitle ||
      !editFormData.serviceDescription ||
      !editFormData.price
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const data = {
      serviceTitle: editFormData.serviceTitle,
      serviceDescription: editFormData.serviceDescription,
      price: Number.parseFloat(editFormData.price),
    };

    updateMutation.mutate({
      id: editingService._id,
      data,
      image: editImage || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const services = servicesData?.data || [];
  const meta = servicesData?.meta || {};

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Dashboard &gt; Services</p>
        </div>
        <Link href="/dashboard/services/add">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
            <div className="col-span-5">Service</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-3">Added</div>
            <div className="col-span-2 ml-3">Actions</div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="border-t border-gray-200 mb-4"></div>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {services.map((service: any) => (
              <div
                key={service._id}
                className="grid grid-cols-12 gap-4 items-center py-4 border-b last:border-b-0"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {service.imageLink ? (
                      <Image
                        src={service.imageLink || "/placeholder.svg"}
                        alt={service.serviceTitle}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 rounded-lg"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {service.serviceTitle}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {service.serviceDescription}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <Badge variant="secondary">${service.price}</Badge>
                </div>
                <div className="col-span-3 text-sm text-gray-600">
                  {new Date(service.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewClick(service)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the service.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(service._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Service Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
          </DialogHeader>
          {viewingService && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Service Name
                    </Label>
                    <p className="text-lg font-medium text-gray-900">
                      {viewingService.serviceTitle}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Price
                    </Label>
                    <p className="text-lg font-medium text-green-600">
                      ${viewingService.price}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Created At
                    </Label>
                    <p className="text-sm text-gray-700">
                      {new Date(viewingService.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Last Updated
                    </Label>
                    <p className="text-sm text-gray-700">
                      {new Date(viewingService.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Service Image
                  </Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    {viewingService.imageLink ? (
                      <Image
                        src={viewingService.imageLink || "/placeholder.svg"}
                        alt={viewingService.serviceTitle}
                        width={400}
                        height={250}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">
                          No image available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Description
                </Label>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {viewingService.serviceDescription}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-serviceTitle">Service Name</Label>
                  <Input
                    id="edit-serviceTitle"
                    name="serviceTitle"
                    value={editFormData.serviceTitle}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-price">Price</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    value={editFormData.price}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-serviceDescription">Description</Label>
                  <Textarea
                    id="edit-serviceDescription"
                    name="serviceDescription"
                    value={editFormData.serviceDescription}
                    onChange={handleEditInputChange}
                    rows={6}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Service Image</Label>
                <div className="mt-2 space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    {editImagePreview ? (
                      <Image
                        src={editImagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image selected</span>
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document.getElementById("edit-image-upload")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                  <input
                    id="edit-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Updating..." : "Update Service"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {[...Array(meta.totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(meta.totalPages, currentPage + 1))
                }
                className={
                  currentPage === meta.totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * 10 + 1} to{" "}
        {Math.min(currentPage * 10, meta.total)} of {meta.total} results
      </div>
    </div>
  );
}
