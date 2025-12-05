import { Button } from "@ui/button";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput
} from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { ChevronsUpDown } from "lucide-react";

export function LedgerSwitch() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[250px] justify-between"
        >
          Select Ledger
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search Ledger" />
          <CommandList>
            <CommandEmpty>Ledger not found</CommandEmpty>
            <CommandGroup>
              <CommandItem>Sample</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
