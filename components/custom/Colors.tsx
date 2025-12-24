import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import { CheckIcon } from "@/components/ui/icon";
import { selectItems } from "@/data/shop";
import { useState } from "react";

export default function Colors() {
  const [color, setColor] = useState([]);
  return (
    <CheckboxGroup
      value={color}
      onChange={(keys) => {
        setColor(keys);
      }}
    >
      <HStack space="2xl">
        {selectItems.colors.map((c) => (
          <Checkbox value={c.name} key={c.id} isDisabled={!c.stock}>
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>{c.name}</CheckboxLabel>
          </Checkbox>
        ))}
      </HStack>
    </CheckboxGroup>
  );
}
