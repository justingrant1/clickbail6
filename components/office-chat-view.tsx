"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Plus,
  Star,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  ArrowUp,
  Send,
  Archive,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample chat room data
const chatRooms = [
  {
    id: "1",
    name: "General Office Discussion",
    isActive: true,
    isStarred: true,
    lastComment: {
      user: "Lucas McCarthy",
      date: "10/22/2024 5:26:38 PM",
    },
    messageCount: 4,
  },
  {
    id: "2",
    name: "Active Investigations",
    isActive: true,
    isStarred: false,
    lastComment: {
      user: "Lucas McCarthy",
      date: "2/20/2024 7:51:52 PM",
    },
    messageCount: 2,
  },
  {
    id: "3",
    name: "Bond Processing",
    isActive: false,
    isStarred: false,
    lastComment: {
      user: "Sarah Johnson",
      date: "1/15/2024 3:42:15 PM",
    },
    messageCount: 0,
  },
]

// Sample messages for General Office Discussion
const generalDiscussionMessages = [
  {
    id: "1",
    user: {
      name: "Lucas McCarthy",
      initials: "LM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "11/9/2024 10:59:47 PM",
    content: "Its just another day in paradise...",
    likes: 0,
    comments: [],
  },
  {
    id: "2",
    user: {
      name: "Lucas McCarthy",
      initials: "LM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "5/28/2024 12:51:14 AM",
    content: "hiiiiiiiii",
    likes: 0,
    comments: [],
  },
  {
    id: "3",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "5/27/2024 9:30:22 AM",
    content: "Good morning everyone! Don't forget we have a team meeting at 2pm today.",
    likes: 2,
    comments: [
      {
        id: "c1",
        user: {
          name: "Mike Wilson",
          initials: "MW",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "5/27/2024 9:45:10 AM",
        content: "Thanks for the reminder!",
      },
    ],
  },
  {
    id: "4",
    user: {
      name: "Mike Wilson",
      initials: "MW",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "5/26/2024 3:15:47 PM",
    content: "Has anyone seen the new court schedule for next week? I need to update my calendar.",
    likes: 1,
    comments: [
      {
        id: "c2",
        user: {
          name: "Lucas McCarthy",
          initials: "LM",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "5/26/2024 4:02:33 PM",
        content: "I just uploaded it to the shared drive. Check the Court Schedules folder.",
      },
      {
        id: "c3",
        user: {
          name: "Mike Wilson",
          initials: "MW",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "5/26/2024 4:10:15 PM",
        content: "Found it, thanks!",
      },
    ],
  },
]

// Sample messages for Active Investigations
const investigationsMessages = [
  {
    id: "1",
    user: {
      name: "Lucas McCarthy",
      initials: "LM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2/20/2024 7:51:52 PM",
    content: "I'm heading out to check on the Johnson case. Will update when I return.",
    likes: 1,
    comments: [],
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2/19/2024 11:23:05 AM",
    content: "New lead on the Smith case. Check your email for details.",
    likes: 3,
    comments: [
      {
        id: "c1",
        user: {
          name: "Lucas McCarthy",
          initials: "LM",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "2/19/2024 11:45:22 AM",
        content: "Got it. I'll follow up this afternoon.",
      },
    ],
  },
]

export function OfficeChatView() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedRoom, setSelectedRoom] = useState(chatRooms[0])
  const [newMessage, setNewMessage] = useState("")
  const [newComment, setNewComment] = useState<Record<string, string>>({})
  const [isStarred, setIsStarred] = useState(selectedRoom.isStarred)

  const handleRoomSelect = (room: (typeof chatRooms)[0]) => {
    setSelectedRoom(room)
    setIsStarred(room.isStarred)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log(`Sending message to ${selectedRoom.name}: ${newMessage}`)
      setNewMessage("")
    }
  }

  const handleSendComment = (messageId: string) => {
    if (newComment[messageId]?.trim()) {
      // In a real app, this would send the comment to the server
      console.log(`Sending comment on message ${messageId}: ${newComment[messageId]}`)
      setNewComment((prev) => ({ ...prev, [messageId]: "" }))
    }
  }

  const handleLike = (messageId: string) => {
    // In a real app, this would toggle the like status on the server
    console.log(`Toggling like on message ${messageId}`)
  }

  const toggleStar = () => {
    setIsStarred(!isStarred)
    // In a real app, this would update the star status on the server
    console.log(`${isStarred ? "Unstarring" : "Starring"} room ${selectedRoom.name}`)
  }

  const getMessagesForRoom = (roomId: string) => {
    if (roomId === "1") return generalDiscussionMessages
    if (roomId === "2") return investigationsMessages
    return []
  }

  const activeRooms = chatRooms.filter((room) => room.isActive)
  const archivedRooms = chatRooms.filter((room) => !room.isActive)
  const currentMessages = getMessagesForRoom(selectedRoom.id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Office Chat</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Start a new chat room
        </Button>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Office Chat Rooms</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active">
                    Active Chat Rooms{" "}
                    <Badge variant="secondary" className="ml-2">
                      {activeRooms.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="archived">
                    Archived Chat Rooms{" "}
                    <Badge variant="secondary" className="ml-2">
                      {archivedRooms.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="p-0">
                  <div className="space-y-1">
                    {activeRooms.map((room) => (
                      <Button
                        key={room.id}
                        variant={selectedRoom.id === room.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleRoomSelect(room)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>{room.name}</span>
                          </div>
                          <Badge>{room.messageCount}</Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="archived" className="p-0">
                  <div className="space-y-1">
                    {archivedRooms.map((room) => (
                      <Button
                        key={room.id}
                        variant={selectedRoom.id === room.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleRoomSelect(room)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Archive className="mr-2 h-4 w-4" />
                            <span>{room.name}</span>
                          </div>
                          <Badge>{room.messageCount}</Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Chat Rooms</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 p-2">
                {activeRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-md cursor-pointer ${
                      selectedRoom.id === room.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleRoomSelect(room)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{room.name}</div>
                      <Badge>{room.messageCount}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last Comment:
                      <br />
                      {room.lastComment.user} - {room.lastComment.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <CardTitle>{selectedRoom.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className={isStarred ? "text-yellow-500" : "text-muted"}
                  onClick={toggleStar}
                >
                  <Star className="h-4 w-4" />
                  <span className="sr-only">{isStarred ? "Unstar" : "Star"} this room</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Pin Room</DropdownMenuItem>
                    <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Archive Room</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col h-[600px]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {currentMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className="bg-card border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={message.user.avatar || "/placeholder.svg"} alt={message.user.name} />
                            <AvatarFallback>{message.user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{message.user.name}</div>
                            <div className="text-xs text-muted-foreground">{message.date}</div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Copy Text</DropdownMenuItem>
                            <DropdownMenuItem>Pin Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Message</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-3">{message.content}</div>

                      <div className="flex items-center gap-4 mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-muted-foreground"
                          onClick={() => handleLike(message.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Like
                          {message.likes > 0 && <span className="text-xs">{message.likes}</span>}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          Comments
                          {message.comments.length > 0 && <span className="text-xs">{message.comments.length}</span>}
                        </Button>
                      </div>
                    </div>

                    {/* Comments */}
                    {message.comments.length > 0 && (
                      <div className="pl-12 space-y-3">
                        {message.comments.map((comment) => (
                          <div key={comment.id} className="bg-muted/50 border rounded-lg p-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                                <AvatarFallback>{comment.user.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className="font-medium text-sm">{comment.user.name}</div>
                                  <div className="text-xs text-muted-foreground">{comment.date}</div>
                                </div>
                                <div className="text-sm mt-1">{comment.content}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="pl-12 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                        <AvatarFallback>LM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Add a comment..."
                          value={newComment[message.id] || ""}
                          onChange={(e) => setNewComment({ ...newComment, [message.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendComment(message.id)
                            }
                          }}
                          className="pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                          onClick={() => handleSendComment(message.id)}
                          disabled={!newComment[message.id]?.trim()}
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send comment</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {currentMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mb-2" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="What's on your mind, Lucas?"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scroll to Top Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-4 w-4" />
          Scroll Back to Top of Page
        </Button>
      </div>
    </div>
  )
}
