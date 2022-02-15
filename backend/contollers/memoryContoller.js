// @description: Get All the Memories
// @route: GET /api/memories
// @access: Public
const getAllMemories = (req, res) => {
  res.status(200).json({ memories: 'All memories listed here' });
};
// @description: Create a Memory
// @route: POST /api/memories
// @access: Private
const createMemory = (req, res) => {
  res.status(200).json({ Memory: 'New Memory created now' });
};
// @description: Update a Memory
// @route: PUT /api/memory/:id
// @access: Private
const updateMemory = (req, res) => {
  res.status(200).json({ Memory: `Update memory ${req.params.id}` });
};
// @description: Update a Memory
// @route: PUT /api/memory/:id
// @access: Private
const deleteMemory = (req, res) => {
  res.status(200).json({ Memory: `Memory ${req.params.id} deleted` });
};

export { getAllMemories, createMemory, updateMemory, deleteMemory };
