class Program {
  static void Main() {
    Console.Write("Insert the first number... ");
    double n1 = Convert.ToDouble(Console.ReadLine());

    Console.Write("Insert the second number... ");
    double n2 = Convert.ToDouble(Console.ReadLine());

    Console.WriteLine($"\nAddition: {n1 + n2}\nSubtraction: {n1 - n2}\nMultiplication: {n1 * n2}\nDivision: {n1 / n2}\nAverage: {(n1 + n2) / 2}");
  }
}