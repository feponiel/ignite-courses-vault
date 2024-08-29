class Program {
  static void Main() {
    Console.Write("Type your first name... ");
    string firstName = Console.ReadLine();

    Console.Write("Type your last name... ");
    string lastName = Console.ReadLine();

    string fullName = firstName + " " + lastName;

    Console.WriteLine($"Your full name is: {fullName}");
  }
}