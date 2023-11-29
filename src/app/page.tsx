"use client";

import { useEffect, useState } from "react";
import mole from "../../public/mole.png";
import hole from "../../public/hole.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [isGameOver, setIsGameOver] = useState(false);

  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  const updateSpeed = () => {
    if (score > 3) {
      setSpeed(800);
    }
    if (score > 6) {
      setSpeed(700);
    }
    if (score > 9) {
      setSpeed(600);
    }
    if (score > 12) {
      setSpeed(500);
    }
    if (score > 16) {
      setSpeed(400);
    }
    if (score > 20) {
      setSpeed(200);
    }
  };

  const whackAMole = () => {
    setScore(score + 1);
    setMoles(new Array(9).fill(false));
    updateSpeed();
  };

  useEffect(() => {
    if (isGameOver) {
      setMoles(new Array(9).fill(false));
    }
  }, [score, isGameOver]);

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * moles.length);
      const newMoles = [...moles];
      newMoles[randomIdx] = true;
      setMoles(newMoles);

      console.log(speed);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, isGameOver]);

  const tryAgain = () => {
    setScore(0);
    setSpeed(800);
    setIsGameOver(false);
  };
  return (
    <>
      <h1>Score: {score}</h1>

      <AlertDialog open={isGameOver}>
        <AlertDialogContent className="bg-zinc-900 border-neutral-600">
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Your Scored {score}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-gray-200 text-black hover:bg-white"
              onClick={tryAgain}
            >
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid max-w-[40%] mx-auto grid-cols-3">
        {moles.map((h, idx: number) => (
          <img
            onClick={() => (h ? whackAMole() : setIsGameOver(true))}
            key={idx}
            src={h ? mole.src : hole.src}
            draggable="false"
          />
        ))}
      </div>
    </>
  );
}
