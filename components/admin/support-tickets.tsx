"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface SupportTicket {
  id: string
  ticket_number: string
  name: string
  email: string
  subject: string
  message: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "normal" | "high" | "urgent"
  category: string
  response_count: number
  created_at: string
  updated_at: string
}

export function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [response, setResponse] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [])

  useEffect(() => {
    filterTickets()
  }, [tickets, searchQuery, statusFilter])

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/admin/support-tickets")
      const data = await res.json()
      setTickets(data.tickets || [])
    } catch (error) {
      console.error("[v0] Error fetching tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterTickets = () => {
    let filtered = tickets

    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.subject.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredTickets(filtered)
  }

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      await fetch("/api/admin/support-tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, status: newStatus }),
      })
      fetchTickets()
    } catch (error) {
      console.error("[v0] Error updating ticket:", error)
    }
  }

  const sendResponse = async () => {
    if (!selectedTicket || !response.trim()) return

    setSending(true)
    try {
      await fetch("/api/admin/support-tickets/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          message: response,
        }),
      })
      setResponse("")
      setSelectedTicket(null)
      fetchTickets()
    } catch (error) {
      console.error("[v0] Error sending response:", error)
    } finally {
      setSending(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Mail className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading support tickets...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tickets by number, name, email, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tickets</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredTickets.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">No support tickets found</Card>
        ) : (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-semibold text-gray-600">{ticket.ticket_number}</span>
                    <Badge className={getStatusColor(ticket.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(ticket.status)}
                        {ticket.status.replace("_", " ")}
                      </span>
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{ticket.subject}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    From: {ticket.name} ({ticket.email})
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">{ticket.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {ticket.response_count} responses
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                        View & Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Ticket {ticket.ticket_number}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">{ticket.subject}</h4>
                          <p className="text-sm text-gray-600">
                            From: {ticket.name} ({ticket.email})
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{ticket.message}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Update Status</Label>
                          <Select value={ticket.status} onValueChange={(value) => updateTicketStatus(ticket.id, value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Send Response</Label>
                          <Textarea
                            placeholder="Type your response here..."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            rows={6}
                          />
                          <Button onClick={sendResponse} disabled={sending || !response.trim()}>
                            {sending ? "Sending..." : "Send Response"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Select value={ticket.status} onValueChange={(value) => updateTicketStatus(ticket.id, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
