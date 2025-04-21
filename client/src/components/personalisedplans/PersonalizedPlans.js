import React, { useState } from "react";
import axios from "axios";
import { Button, Card, CardContent, Input } from "@mui/material";
import { jsPDF } from "jspdf";

const FitnessPlan = () => {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("gain");
  const [plan, setPlan] = useState("");

  const [loading,setloading]=useState(false)


  const fetchPlan = async () => {
    try {
      const userInput = `Generate a 30-day workout and diet plan for ${goal} weight. My current weight is ${weight}kg. Include an Indian food diet.`;
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3.2",
        prompt: userInput,
      });
      const jsonStrings = response.data.trim().split("\n");
      const jsonObjects = jsonStrings.map((line) => JSON.parse(line));
      const fullResponse = jsonObjects.map((obj) => obj.response).join("");
      
      setPlan(fullResponse);
    } catch (error) {
      console.error("Error fetching plan:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("30-Day Fitness Plan", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    const marginLeft = 20;
    const marginTop = 30;
    const pageWidth = 180;
    const lineHeight = 10;
    let yPosition = marginTop;
    
    const splitText = doc.splitTextToSize(plan, pageWidth);
    splitText.forEach((line, index) => {
      if (yPosition + lineHeight > 280) {
        doc.addPage();
        yPosition = marginTop;
      }
      doc.text(line, marginLeft, yPosition);
      yPosition += lineHeight;
    });
    
    doc.save("fitness_plan.pdf");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card sx={{display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
         
        }}>
        <CardContent  sx={{display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
          backgroundColor:"lightblue",
          width:"40%",
          height:"300px",
          borderRadius:"50px" ,
                }} >
          <h2 className="text-xl font-bold mb-4">Generate Fitness Plan</h2>
          <Input
            type="number"
            placeholder="Enter your weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <div className="flex gap-4 my-4">
            <Button onClick={() => setGoal("gain")} className={goal === "gain" ? "bg-blue-500" : ""}>
              Gain Weight
            </Button>
            <Button onClick={() => setGoal("loss")} className={goal === "loss" ? "bg-red-500" : ""}>
              Lose Weight
            </Button>
          </div>
          <Button onClick={fetchPlan} className="bg-green-500 w-full">
            Generate Plan
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <Card className="mt-4" sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center"
        }}>
          <CardContent sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center"
        }}>
            <h3 className="text-lg font-semibold">Your 30-Day Plan</h3>
            <pre className="whitespace-pre-wrap text-sm " style={{
              backgroundColor:"lightblue",
              padding:"50px",
              fontWeight:"bold"
            }}>{plan}</pre>
            <Button onClick={downloadPDF} className="bg-blue-500 mt-4 w-full">
              Download as PDF 
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FitnessPlan;