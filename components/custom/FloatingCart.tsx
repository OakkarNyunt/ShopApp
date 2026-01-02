import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

export default function FloatingCart() {
  return (
    <Fab
      size="sm"
      className="bg-green-500"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}
    >
      <FabIcon as={AddIcon} />
      <FabLabel className="font-bold">Add To Cart</FabLabel>
    </Fab>
  );
}
