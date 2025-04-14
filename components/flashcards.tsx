"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Plus, X, Database, Copy } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface FlashCard {
  id: string
  front: string // Chinese character
  back: string // Translation
  pinyin: string // Pinyin pronunciation
  collectionId: string
  level: number
  nextReview: number
  created: number
}

interface Collection {
  id: string
  name: string
  created: number
}

// Interface for JSON import
interface ImportCard {
  character: string
  charecter?: string // Keep for backward compatibility
  pinyin: string
  translation: string
}

export function Flashcards() {
  const [cards, setCards] = useState<FlashCard[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [pinyin, setPinyin] = useState("")
  const [newCollectionName, setNewCollectionName] = useState("")
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("")
  const [reviewCollectionId, setReviewCollectionId] = useState<string>("")
  const [reviewCards, setReviewCards] = useState<FlashCard[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [currentCard, setCurrentCard] = useState<FlashCard | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [activeTab, setActiveTab] = useState("review")
  const [showRepeatDialog, setShowRepeatDialog] = useState(false)
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importCollectionId, setImportCollectionId] = useState<string>("")
  const [jsonInput, setJsonInput] = useState("")

  // Sample JSON for users to copy
  const sampleJson = JSON.stringify(
    [
      {
        character: "我",
        pinyin: "wǒ",
        translation: "I, me",
      },
      {
        character: "你",
        pinyin: "nǐ",
        translation: "you",
      },
    ],
    null,
    2,
  )

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCards = localStorage.getItem("chineseFlashcards")
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }

    const savedCollections = localStorage.getItem("chineseFlashcardCollections")
    if (savedCollections) {
      const parsedCollections = JSON.parse(savedCollections)
      setCollections(parsedCollections)

      // Set default selected collection if available
      if (parsedCollections.length > 0 && !selectedCollectionId) {
        setSelectedCollectionId(parsedCollections[0].id)
        setReviewCollectionId(parsedCollections[0].id)
      }
    }
  }, [])

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chineseFlashcards", JSON.stringify(cards))
  }, [cards])

  useEffect(() => {
    localStorage.setItem("chineseFlashcardCollections", JSON.stringify(collections))
  }, [collections])

  // Handle collection selection for review - prepare the cards for review
  useEffect(() => {
    if (reviewCollectionId) {
      // Get all cards for this collection and sort them by creation date
      const filteredCards = cards
        .filter((card) => card.collectionId === reviewCollectionId)
        .sort((a, b) => a.created - b.created)

      setReviewCards(filteredCards)

      // Reset to the first card
      setCurrentCardIndex(0)

      if (filteredCards.length > 0) {
        setCurrentCard(filteredCards[0])
        setIsFlipped(false)
        setShowRepeatDialog(false)
      } else {
        setCurrentCard({
          id: "empty",
          front: "No cards in this collection",
          back: "Add some cards first",
          pinyin: "",
          collectionId: reviewCollectionId,
          level: 0,
          nextReview: 0,
          created: 0,
        })
      }
    }
  }, [reviewCollectionId, cards])

  // Add a new collection
  const addCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: newCollectionName.trim(),
        created: Date.now(),
      }

      const updatedCollections = [...collections, newCollection]
      setCollections(updatedCollections)
      setNewCollectionName("")
      setIsNewCollectionModalOpen(false)

      // Select the new collection if it's the first one
      if (updatedCollections.length === 1) {
        setSelectedCollectionId(newCollection.id)
        setReviewCollectionId(newCollection.id)
      }
    }
  }

  // Add a new card
  const addCard = () => {
    if (front.trim() && back.trim() && selectedCollectionId) {
      const newCard: FlashCard = {
        id: Date.now().toString(),
        front: front.trim(),
        back: back.trim(),
        pinyin: pinyin.trim(),
        collectionId: selectedCollectionId,
        level: 0,
        nextReview: Date.now(),
        created: Date.now(),
      }
      setCards((prev) => [...prev, newCard])
      setFront("")
      setBack("")
      setPinyin("")
    }
  }

  // Handle moving to the next card - SIMPLIFIED VERSION
  const handleNextCard = () => {
    // Simple next card logic - just move to the next index
    const nextIndex = currentCardIndex + 1

    if (nextIndex < reviewCards.length) {
      // Move to the next card
      setCurrentCardIndex(nextIndex)
      setCurrentCard(reviewCards[nextIndex])
      setIsFlipped(false)
    } else {
      // End of collection reached
      setShowRepeatDialog(true)
    }
  }

  // Restart the collection review
  const handleRepeatCollection = () => {
    if (reviewCards.length > 0) {
      setCurrentCardIndex(0)
      setCurrentCard(reviewCards[0])
      setIsFlipped(false)
      setShowRepeatDialog(false)
    }
  }

  // Delete a card
  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id))
  }

  // Delete a collection and its cards
  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((collection) => collection.id !== id))
    setCards((prev) => prev.filter((card) => card.collectionId !== id))

    // If the deleted collection was selected, select another one if available
    if (selectedCollectionId === id) {
      const remainingCollections = collections.filter((collection) => collection.id !== id)
      if (remainingCollections.length > 0) {
        setSelectedCollectionId(remainingCollections[0].id)
      } else {
        setSelectedCollectionId("")
      }
    }

    if (reviewCollectionId === id) {
      const remainingCollections = collections.filter((collection) => collection.id !== id)
      if (remainingCollections.length > 0) {
        setReviewCollectionId(remainingCollections[0].id)
      } else {
        setReviewCollectionId("")
      }
    }

    setIsCollectionModalOpen(false)
  }

  // Get collection name by ID
  const getCollectionName = (id: string) => {
    const collection = collections.find((c) => c.id === id)
    return collection ? collection.name : "Unknown Collection"
  }

  // Open the modal for a specific collection
  const openCollectionModal = (id: string) => {
    setSelectedCollectionId(id)
    setIsCollectionModalOpen(true)
  }

  // Open the import modal for a specific collection
  const openImportModal = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setImportCollectionId(id)
    setIsImportModalOpen(true)
  }

  // Copy sample JSON to clipboard
  const copySampleJson = () => {
    navigator.clipboard.writeText(sampleJson)
    toast({
      title: "Copied to clipboard",
      description: "Sample JSON format has been copied to your clipboard.",
    })
  }

  // Import cards from JSON
  const importCardsFromJson = () => {
    try {
      // Parse the JSON input
      const importedCards: ImportCard[] = JSON.parse(jsonInput)

      if (!Array.isArray(importedCards)) {
        throw new Error("JSON must be an array of card objects")
      }

      // Convert imported cards to FlashCard format
      const newCards = importedCards.map((card) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        front: card.character || card.charecter || "",
        pinyin: card.pinyin || "",
        back: card.translation || "",
        collectionId: importCollectionId,
        level: 0,
        nextReview: Date.now(),
        created: Date.now(),
      }))

      // Filter out cards with missing required fields
      const validCards = newCards.filter((card) => card.front && card.back)

      if (validCards.length === 0) {
        throw new Error("No valid cards found in the JSON")
      }

      // Add the new cards to the existing cards
      setCards((prev) => [...prev, ...validCards])

      // Close the modal and clear the input
      setIsImportModalOpen(false)
      setJsonInput("")

      toast({
        title: "Cards imported successfully",
        description: `Added ${validCards.length} cards to ${getCollectionName(importCollectionId)}`,
      })
    } catch (error) {
      toast({
        title: "Error importing cards",
        description: error instanceof Error ? error.message : "Invalid JSON format",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="review" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="review">Review Cards</TabsTrigger>
          <TabsTrigger value="manage">Manage Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="mt-6">
          <div className="mb-6">
            <Label htmlFor="collection-select" className="block mb-2">
              Select Collection
            </Label>
            <Select
              value={reviewCollectionId}
              onValueChange={setReviewCollectionId}
              disabled={collections.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reviewCollectionId ? (
            currentCard && (
              <div className="flex flex-col items-center">
                {/* Card counter */}
                <div className="mb-4 text-sm text-muted-foreground">
                  {currentCard.id !== "empty" && (
                    <>
                      Card {currentCardIndex + 1} of {reviewCards.length}
                    </>
                  )}
                </div>

                <div
                  className="w-full max-w-md cursor-pointer perspective-1000"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div
                    className={cn(
                      "relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d",
                      isFlipped ? "rotate-y-180" : "",
                    )}
                  >
                    {/* Front of card */}
                    <Card
                      className={cn(
                        "absolute w-full h-full backface-hidden flex items-center justify-center p-6",
                        isFlipped ? "hidden" : "",
                      )}
                    >
                      <div className="text-center">
                        <p className="text-5xl mb-4">{currentCard.front}</p>
                        <p className="text-sm text-muted-foreground">Click to flip</p>
                      </div>
                    </Card>

                    {/* Back of card */}
                    <Card
                      className={cn(
                        "absolute w-full h-full backface-hidden flex items-center justify-center p-6 rotate-y-180",
                        !isFlipped ? "hidden" : "",
                      )}
                    >
                      <div className="text-center">
                        {currentCard.pinyin && <p className="text-xl mb-2 text-gray-500">{currentCard.pinyin}</p>}
                        <p className="text-2xl mb-4">{currentCard.back}</p>
                        <p className="text-sm text-muted-foreground">Click to flip back</p>
                      </div>
                    </Card>
                  </div>
                </div>

                {currentCard.id !== "empty" && isFlipped && !showRepeatDialog && (
                  <div className="mt-6">
                    <Button variant="default" onClick={handleNextCard}>
                      Next
                    </Button>
                  </div>
                )}

                {/* Repeat Dialog */}
                <Dialog open={showRepeatDialog} onOpenChange={setShowRepeatDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Collection Complete!</DialogTitle>
                    </DialogHeader>
                    <p className="py-4">You've reviewed all cards in this collection. Would you like to repeat?</p>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                      <Button onClick={handleRepeatCollection}>Repeat Collection</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">Please create and select a collection first.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Collections</h2>
            <Button onClick={() => setIsNewCollectionModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Collection
            </Button>
          </div>

          {collections.length === 0 ? (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-muted-foreground">No collections yet. Create your first collection to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Card
                  key={collection.id}
                  className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => openCollectionModal(collection.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{collection.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {cards.filter((card) => card.collectionId === collection.id).length} cards
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => openImportModal(e, collection.id)}
                      className="flex items-center gap-1"
                    >
                      <Database className="h-3 w-3" />
                      Import
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Collection Management Modal */}
      <Dialog open={isCollectionModalOpen} onOpenChange={setIsCollectionModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{getCollectionName(selectedCollectionId)}</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mb-6">
              <Button
                variant="outline"
                onClick={() => {
                  setReviewCollectionId(selectedCollectionId)
                  setActiveTab("review")
                  setIsCollectionModalOpen(false)
                }}
              >
                Select
              </Button>
              <Button variant="destructive" onClick={() => deleteCollection(selectedCollectionId)}>
                Delete
              </Button>
            </div>

            {/* Add Card Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Add Card to {getCollectionName(selectedCollectionId)}</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="chinese-character">Chinese Character</Label>
                  <Input
                    id="chinese-character"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    placeholder="e.g. 我"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pinyin">Pinyin</Label>
                  <Input
                    id="pinyin"
                    value={pinyin}
                    onChange={(e) => setPinyin(e.target.value)}
                    placeholder="e.g. wǒ"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="meaning">Meaning</Label>
                  <Input
                    id="meaning"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    placeholder="e.g. I, me"
                    className="mt-1"
                  />
                </div>
                <Button onClick={addCard} className="w-full bg-black text-white hover:bg-gray-800">
                  Add Card
                </Button>
              </div>
            </div>

            {/* Cards List */}
            <div>
              <h3 className="text-lg font-medium mb-4">Cards in {getCollectionName(selectedCollectionId)}</h3>
              {cards.filter((card) => card.collectionId === selectedCollectionId).length === 0 ? (
                <p className="text-muted-foreground">No cards in this collection yet.</p>
              ) : (
                <div className="grid gap-4">
                  {cards
                    .filter((card) => card.collectionId === selectedCollectionId)
                    .map((card) => (
                      <div key={card.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-2xl mb-1">{card.front}</p>
                            {card.pinyin && <p className="text-sm text-gray-500 mb-1">{card.pinyin}</p>}
                            <p className="text-gray-500">{card.back}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteCard(card.id)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCollectionModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Collection Modal */}
      <Dialog open={isNewCollectionModalOpen} onOpenChange={setIsNewCollectionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input
                  id="collection-name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g. HSK1 Words"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCollectionModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addCollection}>Create Collection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Modal */}
      <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import to {getCollectionName(importCollectionId)}</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="grid gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="json-format">JSON Format</Label>
                  <Button variant="ghost" size="sm" onClick={copySampleJson} className="h-8 flex items-center gap-1">
                    <Copy className="h-3 w-3" />
                    Copy Example
                  </Button>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-sm font-mono overflow-x-auto mb-4">
                  <pre className="whitespace-pre-wrap">{sampleJson}</pre>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You can ask ChatGPT to generate a list of words in this format for any topic, such as "useful Mandarin
                  words for I.T." or "common medical terms in Chinese".
                </p>
              </div>

              <div>
                <Label htmlFor="json-input">Paste JSON Data</Label>
                <Textarea
                  id="json-input"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON data here..."
                  className="mt-1 font-mono h-48"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={importCardsFromJson}>Import Cards</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
