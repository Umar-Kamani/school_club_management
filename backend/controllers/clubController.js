const ClubModel = require('../models/clubModel');

const ClubController = {
    async getClubs(req, res) {
        try {
            const clubs = await ClubModel.getAll();
            res.json(clubs);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async createClub(req, res) {
        try {
            const id = await ClubModel.create(req.body);
            res.status(201).json({ message: 'Club created', id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async updateClub(req, res) {
        try {
            const { id } = req.params;
            await ClubModel.update(id, req.body);
            res.json({ message: 'Club updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async deleteClub(req, res) {
        try {
            const { id } = req.params;
            await ClubModel.delete(id);
            res.json({ message: 'Club deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = ClubController;
