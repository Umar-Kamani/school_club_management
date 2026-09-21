const MembershipModel = require('../models/membershipModel');

const MembershipController = {
    async getMemberships(req, res) {
        try {
            const memberships = await MembershipModel.getAll();
            res.json(memberships);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async joinClub(req, res) {
        try {
            const id = await MembershipModel.create(req.body);
            res.status(201).json({ message: 'Student joined club successfully', id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async leaveClub(req, res) {
        try {
            const { id } = req.params;
            await MembershipModel.delete(id);
            res.json({ message: 'Membership removed' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = MembershipController;
