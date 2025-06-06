import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Save, RotateCcw } from "lucide-react";
import { insertRhymeSchema, insertToySchema, type Rhyme, type Toy } from "@/types/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CATEGORIES, TOY_CATEGORIES, AGE_GROUPS } from "@/lib/constants";

export default function AdminPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch rhymes and toys
  const { data: rhymes = [] } = useQuery<Rhyme[]>({
    queryKey: ["/api/rhymes"],
  });

  const { data: toys = [] } = useQuery<Toy[]>({
    queryKey: ["/api/toys"],
  });

  // Rhyme form
  const rhymeForm = useForm({
    resolver: zodResolver(insertRhymeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      ageGroup: "",
      youtubeId: "",
      thumbnailUrl: "",
      duration: 0,
    },
  });

  // Toy form
  const toyForm = useForm({
    resolver: zodResolver(insertToySchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      ageGroup: "",
      imageUrl: "",
      rating: "",
      relatedRhymes: [],
    },
  });

  // Mutations
  const createRhymeMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/rhymes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rhymes"] });
      rhymeForm.reset();
      toast({
        title: "Success",
        description: "Rhyme created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create rhyme.",
        variant: "destructive",
      });
    },
  });

  const createToyMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/toys", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/toys"] });
      toyForm.reset();
      toast({
        title: "Success",
        description: "Toy created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create toy.",
        variant: "destructive",
      });
    },
  });

  const deleteRhymeMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/rhymes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rhymes"] });
      toast({
        title: "Success",
        description: "Rhyme deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete rhyme.",
        variant: "destructive",
      });
    },
  });

  const deleteToyMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/toys/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/toys"] });
      toast({
        title: "Success",
        description: "Toy deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete toy.",
        variant: "destructive",
      });
    },
  });

  const onSubmitRhyme = (data: any) => {
    // Extract YouTube ID from URL if needed
    const youtubeId = data.youtubeId.includes("youtube.com") || data.youtubeId.includes("youtu.be")
      ? data.youtubeId.split("v=")[1]?.split("&")[0] || data.youtubeId.split("/").pop()
      : data.youtubeId;

    createRhymeMutation.mutate({
      ...data,
      youtubeId,
      duration: Number(data.duration),
    });
  };

  const onSubmitToy = (data: any) => {
    createToyMutation.mutate({
      ...data,
      price: String(data.price),
      rating: String(data.rating),
      relatedRhymes: data.relatedRhymes || [],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-fredoka text-coral mb-4">
            🔧 Admin Panel
          </h1>
          <p className="text-gray-600">Manage rhymes and toys content</p>
        </div>

        <Tabs defaultValue="rhymes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rhymes">Manage Rhymes</TabsTrigger>
            <TabsTrigger value="toys">Manage Toys</TabsTrigger>
          </TabsList>

          <TabsContent value="rhymes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-coral/5 to-pink/5">
                <CardHeader>
                  <CardTitle className="text-xl font-fredoka text-coral">
                    Add New Rhyme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...rhymeForm}>
                    <form onSubmit={rhymeForm.handleSubmit(onSubmitRhyme)} className="space-y-4">
                      <FormField
                        control={rhymeForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter rhyme title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={rhymeForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={rhymeForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {CATEGORIES.filter(cat => cat.id !== "all").map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={rhymeForm.control}
                          name="ageGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age Group</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select age group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {AGE_GROUPS.map((age) => (
                                    <SelectItem key={age.id} value={age.id}>
                                      {age.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={rhymeForm.control}
                        name="youtubeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>YouTube URL or ID</FormLabel>
                            <FormControl>
                              <Input placeholder="https://youtube.com/... or video ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={rhymeForm.control}
                        name="thumbnailUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thumbnail URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={rhymeForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (seconds)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="180" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-3">
                        <Button
                          type="submit"
                          className="flex-1 bg-coral hover:bg-coral/80"
                          disabled={createRhymeMutation.isPending}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Rhyme
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => rhymeForm.reset()}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-fredoka text-coral">
                    Current Rhymes ({rhymes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {rhymes.map((rhyme) => (
                      <div
                        key={rhyme.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">{rhyme.title}</p>
                          <p className="text-sm text-gray-600">{rhyme.category}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteRhymeMutation.mutate(rhyme.id)}
                          disabled={deleteRhymeMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="toys" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-turquoise/5 to-sky/5">
                <CardHeader>
                  <CardTitle className="text-xl font-fredoka text-turquoise">
                    Add New Toy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...toyForm}>
                    <form onSubmit={toyForm.handleSubmit(onSubmitToy)} className="space-y-4">
                      <FormField
                        control={toyForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Toy Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter toy name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={toyForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={toyForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" placeholder="29.99" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={toyForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {TOY_CATEGORIES.filter(cat => cat.id !== "all").map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={toyForm.control}
                          name="ageGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age Group</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select age group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {AGE_GROUPS.map((age) => (
                                    <SelectItem key={age.id} value={age.id}>
                                      {age.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={toyForm.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rating</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" min="0" max="5" placeholder="4.5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={toyForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-3">
                        <Button
                          type="submit"
                          className="flex-1 bg-turquoise hover:bg-turquoise/80"
                          disabled={createToyMutation.isPending}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Toy
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => toyForm.reset()}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-fredoka text-turquoise">
                    Current Toys ({toys.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {toys.map((toy) => (
                      <div
                        key={toy.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">{toy.name}</p>
                          <p className="text-sm text-gray-600">${toy.price} - {toy.category}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteToyMutation.mutate(toy.id)}
                          disabled={deleteToyMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
