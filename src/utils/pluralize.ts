export default function pluralize(word) {
  // Handle basic plural rules
  if (word.endsWith("y")) {
    return word.slice(0, -1) + "ies"; // e.g., "city" -> "cities"
  } else if (
    word.endsWith("s") ||
    word.endsWith("sh") ||
    word.endsWith("ch") ||
    word.endsWith("x") ||
    word.endsWith("z")
  ) {
    return word + "es"; // e.g., "bus" -> "buses", "box" -> "boxes"
  } else {
    return word + "s"; // Default rule: just add 's'
  }
}
