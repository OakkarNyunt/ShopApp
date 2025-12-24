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

export default function Sizes() {
  const [size, setSize] = useState([]);
  return (
    <CheckboxGroup
      value={size}
      onChange={(keys) => {
        setSize(keys);
      }}
    >
      <HStack space="2xl">
        {selectItems.sizes.map((s) => (
          <Checkbox value={s.name} key={s.id} isDisabled={!s.stock}>
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>{s.name}</CheckboxLabel>
          </Checkbox>
        ))}
      </HStack>
    </CheckboxGroup>
  );
}
