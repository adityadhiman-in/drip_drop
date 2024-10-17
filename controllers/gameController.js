.js
import UserProfile from '../models/UserProfile.js';

// Function to handle awarding aquacoins based on game moves
export const updateCoinsAfterGame = async (req, res) => {
    const { moves } = req.body; // Number of moves user took to complete the game
    const userId = req.user._id;

    try {
        // Find the user's profile
        let userProfile = await UserProfile.findOne({ userId });

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found.' });
        }

        // Calculate aquacoins based on moves
        let aquacoinsAwarded = 0;
        if (moves <= 10) {
            aquacoinsAwarded = 1000;
        } else if (moves <= 20) {
            aquacoinsAwarded = 500;
        } else if (moves <= 30) {
            aquacoinsAwarded = 200;
        } else {
            aquacoinsAwarded = 100;
        }

        // Update the user's aquacoins and save the profile
        userProfile.aquacoins += aquacoinsAwarded;
        await userProfile.save();

        // Respond with the updated profile and coins awarded
        res.status(200).json({
            message: 'Game completed successfully!',
            aquacoinsAwarded,
            totalAquacoins: userProfile.aquacoins,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
