"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { contentInventory, validationChecklist, getContentStats, type ContentItem } from "@/lib/content-validator"
import { Play, ExternalLink } from "lucide-react"

export function ContentValidationDashboard() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [validationResults, setValidationResults] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validations, setValidations] = useState<any[]>([])

  const stats = getContentStats()

  useEffect(() => {
    fetchValidations()
  }, [])

  const fetchValidations = async () => {
    try {
      const response = await fetch("/api/admin/content-validation")
      const data = await response.json()
      setValidations(data.validations || [])
    } catch (error) {
      console.error("Error fetching validations:", error)
    }
  }

  const handleCheckboxChange = (category: string, item: string) => {
    const key = `${category}-${item}`
    setValidationResults((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const calculateCategoryScore = (category: string) => {
    const items = validationChecklist[category as keyof typeof validationChecklist]
    const checked = items.filter((item) => validationResults[`${category}-${item}`]).length
    return Math.round((checked / items.length) * 100)
  }

  const handleSubmitValidation = async () => {
    if (!selectedContent) return

    setIsSubmitting(true)
    try {
      const functionalityScore = calculateCategoryScore("functionality")
      const educationalScore = calculateCategoryScore("educational")
      const technicalScore = calculateCategoryScore("technical")
      const uxScore = calculateCategoryScore("ux")
      const overallScore = Math.round((functionalityScore + educationalScore + technicalScore + uxScore) / 4)

      const issues = Object.entries(validationResults)
        .filter(([_, passed]) => !passed)
        .map(([key]) => key.split("-")[1])

      const response = await fetch("/api/admin/content-validation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: selectedContent.id,
          contentType: selectedContent.type,
          status: overallScore >= 80 ? "passed" : overallScore >= 60 ? "needs_review" : "failed",
          functionalityScore,
          educationalScore,
          technicalScore,
          uxScore,
          notes,
          issues,
        }),
      })

      if (response.ok) {
        alert("Validation submitted successfully!")
        setSelectedContent(null)
        setValidationResults({})
        setNotes("")
        fetchValidations()
      }
    } catch (error) {
      console.error("Error submitting validation:", error)
      alert("Failed to submit validation")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.tested}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Passed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.passed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.passRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="validate" className="w-full">
        <TabsList>
          <TabsTrigger value="validate">Validate Content</TabsTrigger>
          <TabsTrigger value="history">Validation History</TabsTrigger>
        </TabsList>

        <TabsContent value="validate" className="space-y-4">
          {!selectedContent ? (
            <Card>
              <CardHeader>
                <CardTitle>Select Content to Validate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentInventory.map((item) => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                          </div>
                          <Badge
                            variant={
                              item.status === "passed"
                                ? "default"
                                : item.status === "failed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {item.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" onClick={() => setSelectedContent(item)} className="flex-1">
                            <Play className="w-4 h-4 mr-1" />
                            Test
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => window.open(item.path, "_blank")}>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Validating: {selectedContent.title}</CardTitle>
                  <Button variant="outline" onClick={() => setSelectedContent(null)}>
                    Back to List
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(validationChecklist).map(([category, items]) => (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold capitalize">{category}</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateCategoryScore(category)} className="w-24" />
                        <span className="text-sm font-medium">{calculateCategoryScore(category)}%</span>
                      </div>
                    </div>
                    <div className="space-y-2 pl-4">
                      {items.map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={validationResults[`${category}-${item}`] || false}
                            onChange={() => handleCheckboxChange(category, item)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="font-semibold">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    rows={4}
                    placeholder="Add any additional notes or observations..."
                  />
                </div>

                <Button onClick={handleSubmitValidation} disabled={isSubmitting} className="w-full" size="lg">
                  {isSubmitting ? "Submitting..." : "Submit Validation"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Validation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validations.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No validations yet</p>
                ) : (
                  validations.map((validation) => (
                    <div key={validation.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{validation.content_id}</h3>
                          <p className="text-sm text-gray-600">Validated by {validation.validator_email}</p>
                        </div>
                        <Badge
                          variant={
                            validation.status === "passed"
                              ? "default"
                              : validation.status === "failed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {validation.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-5 gap-2 mt-3">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Overall</div>
                          <div className="text-lg font-bold">{validation.overall_score}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Function</div>
                          <div className="text-lg font-bold">{validation.functionality_score}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Education</div>
                          <div className="text-lg font-bold">{validation.educational_score}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Technical</div>
                          <div className="text-lg font-bold">{validation.technical_score}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">UX</div>
                          <div className="text-lg font-bold">{validation.ux_score}%</div>
                        </div>
                      </div>
                      {validation.notes && (
                        <p className="text-sm text-gray-700 mt-3 p-2 bg-gray-50 rounded">{validation.notes}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
