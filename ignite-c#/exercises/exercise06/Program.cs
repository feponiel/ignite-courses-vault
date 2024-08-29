class Program {
  static void Main() {
    DateTime currentDateTime = DateTime.Now;

    Console.WriteLine($"Current Date W/Time: {currentDateTime}\nCurrent Date: {currentDateTime.ToString("MM/dd/yyyy")}\nCurrent Time: {currentDateTime.ToString("HH:mm:ss")}\nCurrent Date In Full: {currentDateTime.ToString("MMMM dd, yyyy")}");
  }
}