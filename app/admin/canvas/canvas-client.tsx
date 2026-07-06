"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, X, ZoomIn, ZoomOut, RotateCcw, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

// Types
interface StatusRow {
  text: string
  status: "green" | "amber" | "purple" | "gray"
}

interface CanvasNode {
  id: string
  x: number
  y: number
  color: string
  icon: string
  title: string
  rows: StatusRow[]
}

interface Edge {
  from: string
  to: string
}

// Constants
const STATUS_COLORS = {
  green: "#639922",
  amber: "#BA7517",
  purple: "#534AB7",
  gray: "#B4B2A9",
}

const NODE_COLORS = [
  { name: "Purple", value: "#EEEDFE" },
  { name: "Green", value: "#EAF3DE" },
  { name: "Amber", value: "#FAEEDA" },
  { name: "Teal", value: "#E6F1FB" },
  { name: "Coral", value: "#FDE8E8" },
  { name: "Gray", value: "#F1EFE8" },
]

const DEFAULT_NODES: CanvasNode[] = [
  {
    id: "traffic",
    x: 30,
    y: 60,
    color: "#E6F1FB",
    icon: "📣",
    title: "Traffic sources",
    rows: [
      { text: "FB Conversions €5/day", status: "green" },
      { text: "Retargeting €2/day", status: "green" },
      { text: "Sintra organic posts", status: "green" },
      { text: "School outreach", status: "amber" },
      { text: "Google Ads", status: "purple" },
    ],
  },
  {
    id: "landing",
    x: 240,
    y: 30,
    color: "#EEEDFE",
    icon: "🌐",
    title: "Landing page",
    rows: [
      { text: "Slovenian copy live", status: "green" },
      { text: "Testimonials added", status: "green" },
      { text: "GDPR popup fixed", status: "green" },
      { text: "Meta Pixel tracking", status: "green" },
    ],
  },
  {
    id: "signup",
    x: 450,
    y: 30,
    color: "#EEEDFE",
    icon: "✍️",
    title: "Sign up (free)",
    rows: [
      { text: "Email + password", status: "green" },
      { text: "Referral code field", status: "green" },
      { text: "Byte welcome screen", status: "green" },
      { text: "Welcome email D1", status: "amber" },
    ],
  },
  {
    id: "platform",
    x: 660,
    y: 30,
    color: "#EAF3DE",
    icon: "🤖",
    title: "Platform (free tier)",
    rows: [
      { text: "AI umetniški studio", status: "green" },
      { text: "2 lessons per course", status: "green" },
      { text: "6 games available", status: "green" },
      { text: "Byte AI tutor", status: "green" },
      { text: "16 badges system", status: "green" },
    ],
  },
  {
    id: "email",
    x: 450,
    y: 240,
    color: "#FAEEDA",
    icon: "📧",
    title: "Email sequence",
    rows: [
      { text: "D1: Welcome + lesson", status: "amber" },
      { text: "D3: Value email", status: "amber" },
      { text: "D5: Social proof", status: "amber" },
      { text: "D6: Upgrade nudge", status: "amber" },
      { text: "D7: Final push", status: "amber" },
    ],
  },
  {
    id: "pricing",
    x: 660,
    y: 240,
    color: "#EEEDFE",
    icon: "💳",
    title: "Pricing page",
    rows: [
      { text: "Free tier — €0", status: "green" },
      { text: "Pro monthly €7.90", status: "green" },
      { text: "Pro yearly €59", status: "green" },
      { text: "Stripe checkout live", status: "green" },
    ],
  },
  {
    id: "pro",
    x: 860,
    y: 120,
    color: "#EAF3DE",
    icon: "🏆",
    title: "Pro subscriber",
    rows: [
      { text: "All 5 courses", status: "green" },
      { text: "Certificates", status: "green" },
      { text: "Parent dashboard", status: "green" },
      { text: "Weekly reports", status: "green" },
      { text: "Unlimited Byte", status: "green" },
    ],
  },
  {
    id: "courses",
    x: 860,
    y: 340,
    color: "#EAF3DE",
    icon: "📚",
    title: "Course catalogue",
    rows: [
      { text: "AI umetniški studio", status: "green" },
      { text: "AI osnove za otroke", status: "amber" },
      { text: "AI varnost in etika", status: "amber" },
      { text: "Programiranje z AI", status: "amber" },
      { text: "Robotika in AI", status: "amber" },
    ],
  },
  {
    id: "analytics",
    x: 240,
    y: 420,
    color: "#F1EFE8",
    icon: "📊",
    title: "Analytics & tracking",
    rows: [
      { text: "Meta Pixel verified", status: "green" },
      { text: "CompleteRegistration", status: "green" },
      { text: "Vercel Analytics", status: "green" },
      { text: "Sentry errors", status: "green" },
      { text: "Custom conversion", status: "amber" },
    ],
  },
  {
    id: "retention",
    x: 660,
    y: 440,
    color: "#FAEEDA",
    icon: "🔄",
    title: "Retention",
    rows: [
      { text: "Daily challenges", status: "green" },
      { text: "Achievement badges", status: "green" },
      { text: "Progress tracking", status: "green" },
      { text: "Parent reports", status: "amber" },
      { text: "Referral programme", status: "purple" },
    ],
  },
  {
    id: "expansion",
    x: 30,
    y: 440,
    color: "#EEEDFE",
    icon: "🌍",
    title: "Market expansion",
    rows: [
      { text: "Slovenia — live", status: "green" },
      { text: "Croatia — M3", status: "purple" },
      { text: "Austria — M4", status: "purple" },
      { text: "Hungary — M6", status: "purple" },
      { text: "Italy — M6", status: "purple" },
    ],
  },
  {
    id: "revenue",
    x: 1060,
    y: 240,
    color: "#EAF3DE",
    icon: "💰",
    title: "Revenue targets",
    rows: [
      { text: "M1: €200 MRR", status: "amber" },
      { text: "M2: €500 MRR", status: "amber" },
      { text: "M3: €1,000 MRR", status: "amber" },
      { text: "M5: €4,000 MRR", status: "purple" },
      { text: "M6: €7,000+ MRR", status: "purple" },
    ],
  },
]

const DEFAULT_EDGES: Edge[] = [
  { from: "traffic", to: "landing" },
  { from: "landing", to: "signup" },
  { from: "signup", to: "platform" },
  { from: "platform", to: "pro" },
  { from: "signup", to: "email" },
  { from: "email", to: "pricing" },
  { from: "pricing", to: "pro" },
  { from: "pro", to: "courses" },
  { from: "pro", to: "revenue" },
  { from: "platform", to: "retention" },
  { from: "analytics", to: "email" },
  { from: "expansion", to: "traffic" },
]

const STORAGE_KEYS = {
  positions: "kidslearnai-canvas-positions",
  nodes: "kidslearnai-canvas-nodes",
}

const NODE_WIDTH = 180
const NODE_HEIGHT_BASE = 60

export default function CanvasClient() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [nodes, setNodes] = useState<CanvasNode[]>([])
  const [edges] = useState<Edge[]>(DEFAULT_EDGES)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState<string | null>(null)
  const [panning, setPanning] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showAddForm, setShowAddForm] = useState(false)
  const [newNode, setNewNode] = useState({
    title: "",
    icon: "📌",
    color: NODE_COLORS[0].value,
    rows: [{ text: "", status: "green" as const }],
  })
  const canvasRef = useRef<HTMLDivElement>(null)

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profile?.role !== "admin") {
        router.push("/")
        return
      }

      setIsAdmin(true)
    }

    checkAdmin()
  }, [router])

  // Load nodes from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    const savedNodes = localStorage.getItem(STORAGE_KEYS.nodes)
    const savedPositions = localStorage.getItem(STORAGE_KEYS.positions)

    if (savedNodes) {
      try {
        const parsed = JSON.parse(savedNodes)
        if (savedPositions) {
          const positions = JSON.parse(savedPositions)
          const nodesWithPositions = parsed.map((node: CanvasNode) => ({
            ...node,
            x: positions[node.id]?.x ?? node.x,
            y: positions[node.id]?.y ?? node.y,
          }))
          setNodes(nodesWithPositions)
        } else {
          setNodes(parsed)
        }
      } catch {
        setNodes(DEFAULT_NODES)
      }
    } else if (savedPositions) {
      try {
        const positions = JSON.parse(savedPositions)
        const nodesWithPositions = DEFAULT_NODES.map((node) => ({
          ...node,
          x: positions[node.id]?.x ?? node.x,
          y: positions[node.id]?.y ?? node.y,
        }))
        setNodes(nodesWithPositions)
      } catch {
        setNodes(DEFAULT_NODES)
      }
    } else {
      setNodes(DEFAULT_NODES)
    }
  }, [])

  // Save positions to localStorage
  const savePositions = useCallback(() => {
    const positions: Record<string, { x: number; y: number }> = {}
    nodes.forEach((node) => {
      positions[node.id] = { x: node.x, y: node.y }
    })
    localStorage.setItem(STORAGE_KEYS.positions, JSON.stringify(positions))
  }, [nodes])

  // Save nodes to localStorage
  const saveNodes = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.nodes, JSON.stringify(nodes))
    savePositions()
  }, [nodes, savePositions])

  // Mouse handlers for dragging nodes
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation()
      setDragging(nodeId)
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        setDragStart({
          x: (e.clientX - rect.left - pan.x) / zoom,
          y: (e.clientY - rect.top - pan.y) / zoom,
        })
      }
    },
    [pan, zoom]
  )

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains("canvas-bg")) {
        setPanning(true)
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
      }
    },
    [pan]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragging) {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
          const x = (e.clientX - rect.left - pan.x) / zoom
          const y = (e.clientY - rect.top - pan.y) / zoom
          const node = nodes.find((n) => n.id === dragging)
          if (node) {
            const dx = x - dragStart.x
            const dy = y - dragStart.y
            setNodes((prev) =>
              prev.map((n) =>
                n.id === dragging ? { ...n, x: n.x + dx, y: n.y + dy } : n
              )
            )
            setDragStart({ x, y })
          }
        }
      } else if (panning) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [dragging, panning, pan, zoom, nodes, dragStart]
  )

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      savePositions()
    }
    setDragging(null)
    setPanning(false)
  }, [dragging, savePositions])

  // Zoom handlers
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) => Math.min(Math.max(0.3, prev + delta), 2))
  }, [])

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2))
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.3))
  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const resetPositions = () => {
    localStorage.removeItem(STORAGE_KEYS.positions)
    localStorage.removeItem(STORAGE_KEYS.nodes)
    setNodes(DEFAULT_NODES)
  }

  // Delete node
  const deleteNode = (nodeId: string) => {
    setNodes((prev) => {
      const updated = prev.filter((n) => n.id !== nodeId)
      localStorage.setItem(STORAGE_KEYS.nodes, JSON.stringify(updated))
      return updated
    })
  }

  // Add new node
  const addNode = () => {
    if (!newNode.title.trim()) return

    const node: CanvasNode = {
      id: `custom-${Date.now()}`,
      x: 100,
      y: 100,
      color: newNode.color,
      icon: newNode.icon,
      title: newNode.title,
      rows: newNode.rows.filter((r) => r.text.trim()),
    }

    setNodes((prev) => {
      const updated = [...prev, node]
      localStorage.setItem(STORAGE_KEYS.nodes, JSON.stringify(updated))
      return updated
    })

    setNewNode({
      title: "",
      icon: "📌",
      color: NODE_COLORS[0].value,
      rows: [{ text: "", status: "green" }],
    })
    setShowAddForm(false)
  }

  // Calculate bezier curve path
  const getBezierPath = (fromNode: CanvasNode, toNode: CanvasNode) => {
    const fromRowsCount = fromNode.rows.length
    const toRowsCount = toNode.rows.length
    const fromHeight = NODE_HEIGHT_BASE + fromRowsCount * 24
    const toHeight = NODE_HEIGHT_BASE + toRowsCount * 24

    const fromX = fromNode.x + NODE_WIDTH
    const fromY = fromNode.y + fromHeight / 2
    const toX = toNode.x
    const toY = toNode.y + toHeight / 2

    const dx = toX - fromX
    const controlOffset = Math.abs(dx) * 0.4

    return `M ${fromX} ${fromY} C ${fromX + controlOffset} ${fromY}, ${toX - controlOffset} ${toY}, ${toX} ${toY}`
  }

  if (isAdmin === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex h-screen flex-col bg-[#FAFAF8]">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Nazaj na Admin
          </Link>
          <h1 className="text-lg font-semibold">Business Canvas</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Add node
          </Button>
        </div>
      </div>

      {/* Add Node Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Node</h2>
              <button onClick={() => setShowAddForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-[60px_1fr] gap-3">
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={newNode.icon}
                    onChange={(e) => setNewNode({ ...newNode, icon: e.target.value })}
                    className="text-center text-xl"
                    maxLength={2}
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={newNode.title}
                    onChange={(e) => setNewNode({ ...newNode, title: e.target.value })}
                    placeholder="Node title"
                  />
                </div>
              </div>

              <div>
                <Label>Color</Label>
                <div className="mt-2 flex gap-2">
                  {NODE_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setNewNode({ ...newNode, color: c.value })}
                      className={`h-8 w-8 rounded-full border-2 ${
                        newNode.color === c.value ? "border-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>Rows (up to 6)</Label>
                <div className="mt-2 space-y-2">
                  {newNode.rows.map((row, i) => (
                    <div key={i} className="flex gap-2">
                      <select
                        value={row.status}
                        onChange={(e) => {
                          const updated = [...newNode.rows]
                          updated[i].status = e.target.value as StatusRow["status"]
                          setNewNode({ ...newNode, rows: updated })
                        }}
                        className="w-20 rounded border px-2 py-1 text-sm"
                      >
                        <option value="green">Live</option>
                        <option value="amber">Progress</option>
                        <option value="purple">Planned</option>
                        <option value="gray">Paused</option>
                      </select>
                      <Input
                        value={row.text}
                        onChange={(e) => {
                          const updated = [...newNode.rows]
                          updated[i].text = e.target.value
                          setNewNode({ ...newNode, rows: updated })
                        }}
                        placeholder="Row text"
                        className="flex-1"
                      />
                      {newNode.rows.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = newNode.rows.filter((_, idx) => idx !== i)
                            setNewNode({ ...newNode, rows: updated })
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {newNode.rows.length < 6 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setNewNode({
                          ...newNode,
                          rows: [...newNode.rows, { text: "", status: "green" }],
                        })
                      }
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add row
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button onClick={addNode}>Add Node</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="canvas-bg relative flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          backgroundImage: `radial-gradient(circle, #E5E5E0 1px, transparent 1px)`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      >
        {/* SVG for edges */}
        <svg
          className="pointer-events-none absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#D3D1C7" />
            </marker>
          </defs>
          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.from)
            const toNode = nodes.find((n) => n.id === edge.to)
            if (!fromNode || !toNode) return null
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={getBezierPath(fromNode, toNode)}
                fill="none"
                stroke="#D3D1C7"
                strokeWidth={1.5}
                markerEnd="url(#arrowhead)"
              />
            )
          })}
        </svg>

        {/* Nodes */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute cursor-move select-none rounded-lg border border-[#E5E5E0] shadow-sm transition-shadow hover:shadow-md"
              style={{
                left: node.x,
                top: node.y,
                width: NODE_WIDTH,
                backgroundColor: node.color,
              }}
              onMouseDown={(e) => handleMouseDown(e, node.id)}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E5E5E0]/50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{node.icon}</span>
                  <span className="text-sm font-medium text-[#3D3D3D]">{node.title}</span>
                </div>
                {node.id.startsWith("custom-") && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNode(node.id)
                    }}
                    className="text-[#B4B2A9] hover:text-[#3D3D3D]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              {/* Rows */}
              <div className="px-3 py-2">
                {node.rows.map((row, i) => (
                  <div key={i} className="flex items-center gap-2 py-0.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[row.status] }}
                    />
                    <span className="text-xs text-[#5C5C5C]">{row.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend (bottom left) */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-lg bg-background/90 px-4 py-2 shadow-sm backdrop-blur">
          {Object.entries(STATUS_COLORS).map(([status, color]) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground">
                {status === "green"
                  ? "Live"
                  : status === "amber"
                    ? "In progress"
                    : status === "purple"
                      ? "Planned"
                      : "Paused"}
              </span>
            </div>
          ))}
        </div>

        {/* Controls (bottom right) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-background/90 p-1 shadow-sm backdrop-blur">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomIn} title="Zoom in">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={zoomOut} title="Zoom out">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div className="mx-1 h-4 w-px bg-border" />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetView} title="Reset view">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={saveNodes} title="Save">
            <Save className="h-4 w-4" />
          </Button>
          <div className="mx-1 h-4 w-px bg-border" />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={resetPositions}
            title="Reset to defaults"
          >
            Reset all
          </Button>
        </div>
      </div>
    </div>
  )
}
