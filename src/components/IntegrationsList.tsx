"use client"

import * as React from "react"
import { Search, Filter, X, CheckCircle, AlertCircle, Clock, Unplug } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Integration, IntegrationCategory } from "@/types/integrations"
import { integrations, integrationCategories } from "@/demoData-integrations"

interface IntegrationsListProps {
  integrations?: Integration[]
  categories?: IntegrationCategory[]
}

export function IntegrationsList({ 
  integrations: propIntegrations = integrations, 
  categories: propCategories = integrationCategories 
}: IntegrationsListProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all")

  // Filter integrations based on search and filters
  const filteredIntegrations = React.useMemo(() => {
    return propIntegrations.filter((integration) => {
      // Only show integrations that have logo files
      if (!integration.icon.startsWith('/')) {
        return false
      }
      
      const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           integration.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || integration.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [propIntegrations, searchTerm, selectedCategory, selectedStatus])

  // Separate active and available integrations
  const activeIntegrations = filteredIntegrations.filter(integration => integration.isConnected)
  const availableIntegrations = filteredIntegrations.filter(integration => !integration.isConnected)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  const formatLastSync = (lastSync?: string) => {
    if (!lastSync) return null
    const date = new Date(lastSync)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedStatus("all")
  }

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedStatus !== "all"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Integrations</h3>
          <p className="text-sm text-muted-foreground">
            Connect your favorite tools and services to streamline your workflow.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                All Categories
              </DropdownMenuItem>
              {propCategories.map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon} {category.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("active")}>
                Connected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("inactive")}>
                Not Connected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("error")}>
                Error
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="w-full sm:w-auto">
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Integrations */}
      {activeIntegrations.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold">
              Active integrations ({activeIntegrations.length})
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeIntegrations.map((integration) => (
              <IntegrationCard 
                key={integration.id} 
                integration={integration} 
                isActive={true}
                formatLastSync={formatLastSync}
                getStatusIcon={getStatusIcon}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Integrations */}
      {availableIntegrations.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold">
              Available integrations ({availableIntegrations.length})
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => (
              <IntegrationCard 
                key={integration.id} 
                integration={integration} 
                isActive={false}
                formatLastSync={formatLastSync}
                getStatusIcon={getStatusIcon}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredIntegrations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No integrations found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface IntegrationCardProps {
  integration: Integration
  isActive: boolean
  formatLastSync: (lastSync?: string) => string | null
  getStatusIcon: (status: string) => React.ReactNode
}

function IntegrationCard({ 
  integration, 
  isActive, 
  formatLastSync, 
  getStatusIcon
}: IntegrationCardProps) {
  const isImageIcon = integration.icon.startsWith('/')
  
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3 flex-1">
        <div className="flex items-start justify-between h-full">
          <div className="flex-1">
            <CardTitle className="text-base">{integration.name}</CardTitle>
            <CardDescription className="mt-1">
              {integration.description}
            </CardDescription>
          </div>
          
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center ml-3 flex-shrink-0 overflow-hidden"
            style={{ backgroundColor: integration.color + '20' }}
          >
            {isImageIcon ? (
              <img 
                src={integration.icon} 
                alt={`${integration.name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <span 
                className="text-lg"
                style={{ color: integration.color }}
              >
                {integration.icon}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 mt-auto">
        {/* Action Button */}
        {isActive ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
            >
              Active - last sync {formatLastSync(integration.lastSync) || 'unknown'}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                // Handle disconnect
                console.log('Disconnect:', integration.id)
              }}
              title="Disconnect"
            >
              <Unplug className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => {
              // Handle connect
              console.log('Connect:', integration.id)
            }}
          >
            Connect
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 