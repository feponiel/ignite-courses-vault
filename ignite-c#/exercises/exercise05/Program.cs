class Program {
  static void Main() {
    string licensePlate = "";
    
    while (licensePlate.Length != 7) {
      Console.Write("Type the vehicle license plate... ");
      licensePlate = Console.ReadLine().ToLower();
    }

    Console.WriteLine(CheckVehicleLicensePlate(licensePlate));
  }

  static bool CheckVehicleLicensePlate(string licensePlate) {
    string licensePlateFirstPart = licensePlate[0..3];
    bool doesFirstPartHasOnlyLetters = licensePlateFirstPart.All("abcdefghijklmnopqrstuvwxyz".Contains);

    string licensePlateSecondPart = licensePlate[3..7];
    bool doesSecondPartHasOnlyNumbers = licensePlateSecondPart.All("0123456789".Contains);

    return doesFirstPartHasOnlyLetters && doesSecondPartHasOnlyNumbers;
  }
}