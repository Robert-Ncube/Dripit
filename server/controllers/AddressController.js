import Address from "../models/Adress.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, country, zipcode, email, phone, notes } =
      req.body;

    if (
      !userId ||
      !address ||
      !city ||
      !country ||
      !zipcode ||
      !email ||
      !phone ||
      !notes
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      country,
      zipcode,
      email,
      phone,
      notes,
    });

    const savedAddress = await newAddress.save();

    res.status(200).json({ success: true, data: savedAddress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error!" });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required!" });
    }

    const addresses = await Address.find({ userId });

    if (!addresses) {
      return res
        .status(404)
        .json({ success: false, error: "No addresses found!" });
    }

    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error!" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        error: "User ID and Address ID are required!",
      });
    }

    const UpdatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId: userId,
      },
      formData,
      { new: true }
    );

    if (!UpdatedAddress) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found!" });
    }

    res.status(200).json({ success: true, data: UpdatedAddress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error!" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        error: "User ID and Address ID are required!",
      });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId,
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error!" });
  }
};
