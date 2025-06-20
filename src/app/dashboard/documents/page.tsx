import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentsPage() {
  return (
    <div className="px-4 mt-4 sm:px-6 mt-6 lg:px-8 mt-8">
      <PageHeader variant="minimal" title="Documents" />
      
      <div className="mt-6">
        <Tabs defaultValue="my-documents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-documents">My documents</TabsTrigger>
            <TabsTrigger value="team-documents">Team documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-documents" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">My documents</h3>
              <p className="text-muted-foreground">View and manage your personal documents.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="team-documents" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Team documents</h3>
              <p className="text-muted-foreground">Access and collaborate on team-shared documents.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 