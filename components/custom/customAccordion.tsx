import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type ReactNode } from "react";

type AccordionItemData = {
  triggerContent: ReactNode;
  content: ReactNode;
};

type CustomAccordionProps = {
  data: AccordionItemData[];
  defaultOpen?: boolean;
};

export const CustomAccordion = ({
  data,
  defaultOpen = false,
}: CustomAccordionProps) => {
  // Set defaultValue for type="multiple" (string[])
  const defaultValue = defaultOpen && data.length > 0 ? ["item-0"] : [];

  return (
    <Accordion type="multiple" defaultValue={defaultValue} className="w-full">
      {data.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="items-center cursor-pointer no-underline">
            {item.triggerContent}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};