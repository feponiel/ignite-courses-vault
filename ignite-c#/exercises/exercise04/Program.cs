class Program {
  static void Main() {
    Console.Write("Type the desired word... ");
    string word = Console.ReadLine();

    Console.WriteLine($"The word {word} has {word.Length} letters.");
  }
}