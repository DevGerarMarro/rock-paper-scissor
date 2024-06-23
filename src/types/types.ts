export type ChoicesType = "rock" | "paper" | "scissor";

export type props = {
    onSelection: (selection:ChoicesType) => void;
};