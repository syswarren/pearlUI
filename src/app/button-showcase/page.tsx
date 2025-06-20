"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sun, Moon, Plus, Settings, Trash2, ExternalLink, Download } from "lucide-react"

const buttonVariants = [
  { name: "default", label: "Default" },
  { name: "destructive", label: "Destructive" },
  { name: "outline", label: "Outline" },
  { name: "secondary", label: "Secondary" },
  { name: "ghost", label: "Ghost" },
  { name: "link", label: "Link" },
]

const buttonSizes = [
  { name: "sm", label: "Small" },
  { name: "default", label: "Default" },
  { name: "lg", label: "Large" },
  { name: "icon", label: "Icon" },
]

export default function ButtonShowcasePage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    setIsDark(theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches))
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)
    localStorage.setItem("theme", newTheme)
    
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Button Showcase</h1>
          <p className="text-muted-foreground mt-2">
            All button variants and sizes in {isDark ? "dark" : "light"} mode
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="w-10 h-10"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Theme Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Current Theme: {isDark ? "Dark" : "Light"}
          </CardTitle>
          <CardDescription>
            Click the theme toggle button to switch between light and dark modes
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>
            All available button variants with default size
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buttonVariants.map((variant) => (
              <div key={variant.name} className="space-y-2">
                <h3 className="font-medium text-sm">{variant.label}</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant={variant.name as any}>
                    {variant.label}
                  </Button>
                  <Button variant={variant.name as any} disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Button Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Button Sizes</CardTitle>
          <CardDescription>
            All available button sizes with default variant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buttonSizes.map((size) => (
              <div key={size.name} className="space-y-2">
                <h3 className="font-medium text-sm">{size.label}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {size.name === "icon" ? (
                    <>
                      <Button size={size.name as any}>
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size={size.name as any} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size={size.name as any} variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size={size.name as any}>
                        {size.label} Button
                      </Button>
                      <Button size={size.name as any} variant="outline">
                        {size.label} Button
                      </Button>
                      <Button size={size.name as any} variant="secondary">
                        {size.label} Button
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complete Variant Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Variant Matrix</CardTitle>
          <CardDescription>
            All variants with all sizes (excluding icon size for non-icon variants)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {buttonVariants.map((variant) => (
              <div key={variant.name} className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2">
                  {variant.label} Variant
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {buttonSizes
                    .filter((size) => size.name !== "icon" || variant.name === "ghost" || variant.name === "outline")
                    .map((size) => (
                      <div key={size.name} className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                          {size.label} Size
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {size.name === "icon" ? (
                            <Button variant={variant.name as any} size={size.name as any}>
                              <Settings className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant={variant.name as any} size={size.name as any}>
                              {variant.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Examples</CardTitle>
          <CardDescription>
            Buttons with icons and common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="space-y-3">
              <h3 className="font-semibold">Common Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="secondary">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
                <Button variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Button>
                <Button variant="link">
                  Learn More
                </Button>
              </div>
            </div>

            <Separator />

            {/* Form Actions */}
            <div className="space-y-3">
              <h3 className="font-semibold">Form Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="secondary">Reset</Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>

            <Separator />

            {/* Navigation */}
            <div className="space-y-3">
              <h3 className="font-semibold">Navigation</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost">Back</Button>
                <Button>Next</Button>
                <Button variant="outline">Skip</Button>
                <Button variant="link">View All</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSS Variables Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Design System Colors</CardTitle>
          <CardDescription>
            CSS custom properties used by the button variants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Primary Colors</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary"></div>
                  <span>--color-primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary-foreground"></div>
                  <span>--color-primary-foreground</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Secondary Colors</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary"></div>
                  <span>--color-secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary-foreground"></div>
                  <span>--color-secondary-foreground</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Destructive Colors</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-destructive"></div>
                  <span>--color-destructive</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 