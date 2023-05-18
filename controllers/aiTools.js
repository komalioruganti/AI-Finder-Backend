const AiTool = require("../model/aiToolModel");


const getAllAITools = async (req, res, next) => {
console.log("Get All AI tools called")
let aiTools;
  aiTools = await AiTool.find().exec()

  res.status(200).json(aiTools);
};


const getAiToolById = async (req, res, next) => {
  console.log("getAiTool By ID called");
  const search_id = req.query.id;

  let aiTools;
  aiTools = await AiTool.find().exec()

  if (aiTools.length === 0) {
    return res.status(404).json({ message: "AI tool not found" });
  }

  const response = await AiTool.findOne({id: search_id});
  if (response !== undefined) {
    res.status(200).json(response)
  } else {
    res.send("Error:  ID does not exist")
  }

};

const getAiToolByNameAndTags = async (req,res,next) => {
  console.log("getAiTool By Name or Tags called");
  const search_name = req.query.name;
  let aiTools;
  aiTools = await AiTool.find().exec()
  if(search_name === ""){
    return
  }else{
    if(aiTools.length === 0) {
      return res.status(404).json({ message: "AI tool not found" });
    }
    const regex = new RegExp(search_name, "i");
    const response = await aiTools.filter((element) =>regex.test(element.name) || element.tags.some(tag => regex.test(tag)) );
    if (response !== undefined) {
      res.status(200).json(response)
    } else {
      res.send("Error:  Name or tag does not exist")
    }
  }
}

module.exports = { getAllAITools, getAiToolById ,getAiToolByNameAndTags};
