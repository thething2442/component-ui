import * as React from "react"
import {
  File,
  ListFilter,
  PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

const blockTypes = [
  {
    value: "text",
    label: "Text",
    icon: File,
  },
  {
    value: "heading1",
    label: "Heading 1",
    icon: PlusCircle,
  },
  {
    value: "heading2",
    label: "Heading 2",
    icon: PlusCircle,
  },
  {
    value: "bulletedList",
    label: "Bulleted List",
    icon: ListFilter,
  },
]

export function BlockSelector({ onSelectBlock }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Block</CardTitle>
        <CardDescription>
          Select a block type to add to your canvas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Command>
          <CommandInput placeholder="Filter blocks..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Elements">
              {blockTypes.map((block) => (
                <CommandItem
                  key={block.value}
                  onSelect={() => {
                    onSelectBlock(block.value)
                    setOpen(false)
                  }}
                  className="flex items-center"
                >
                  <block.icon className="mr-2 h-4 w-4" />
                  <span>{block.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  )
} 