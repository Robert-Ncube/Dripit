import Feature from "../models/Features.js";

export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide an image." });
    }

    const feature = new Feature({ image });
    await feature.save();

    return res.json({ success: true, data: feature });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getFeatureImages = async (req, res) => {
  try {
    const features = await Feature.find();

    return res.json({ success: true, data: features });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide an id." });
    }

    const feature = await Feature.findByIdAndDelete(id);

    if (!feature) {
      return res
        .status(404)
        .json({ success: false, error: "Feature not found." });
    }

    return res.json({ success: true, data: feature });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
