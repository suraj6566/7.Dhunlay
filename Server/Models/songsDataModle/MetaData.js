const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    subscriptionType: {
      type: String,
      required: false,
      trim: true,
    },
    releaseType: { type: String, required: true, trim: true, index: true },
    songTitle: { type: String, required: true, trim: true, index: true },
    primaryArtist: { type: [String], required: true, trim: true }, // Array instead of a single string
    featuringArtists: { type: [String], default: [], trim: true },
    author: { type: [String], required: false, trim: true }, // Allow multiple authors
    composer: { type: [String], required: false, trim: true }, // Allow multiple composers
    musicProducer: { type: [String], required: false, trim: true }, // Multiple producers
    musicDirector: { type: [String], required: false, trim: true }, // Multiple directors
    lyrics: { type: String, trim: true },
    lyricsFile: { type: String, trim: true },
    C_line: { type: String, trim: true },
    P_line: { type: String, trim: true },
    labelName: { type: String, trim: true },

    genres: {
      type: [String],
      required: false,
      validate: (arr) => arr.length > 0,
    }, // At least one genre

    language: { type: String, required: false, trim: true },

    //------------------------------------------------------step-2
    coverArt: {
      type: String, // Array of image URLs or file paths
      required: false,
      trim: true,
    },

    songFiles: [
      {
        format: {
          type: String,
          required: true,
          trim: true,
          enum: ["WAV"],
          default: "WAV",
        },
        fileUrl: {
          type: [String],
          required: true,
          trim: true,
        },
      },
    ],

    // ------------------------------------------------------------------ step-3
    explicitContent: { type: Boolean, default: false },
    distributionPlatforms: {
      type: [String],
      required: false,
    },
    metadata: {
      isrc: { type: String, false: true, trim: true },
      upc: { type: String, trim: true },
      bpm: { type: Number, min: 30, max: 300 }, // BPM range check
      key: { type: String, trim: true },
      mood: { type: String, trim: true },
    },
    releaseDate: { type: Date, required: true },
    submittedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
      email: { type: String, required: false, trim: true, lowercase: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Released", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
