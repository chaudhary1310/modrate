"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (playVideo) {
      setOpenDialog(true); // Open the dialog when playVideo changes
      if (videoId) GetVideoData();
    }
  }, [playVideo]);

  const GetVideoData = async () => {
    try {
      const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
      setVideoData(result[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpenDialog(false);  // Close the dialog
    router.replace('/Dashboard');  // Redirect to dashboard
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Video Generated
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrame.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls={true}
              inputProps={{
                ...videoData,
                setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
              }}
            />
            <div className="flex gap-10 mt-10">
              {/* Close the dialog and navigate on Cancel */}
              <Button variant="ghost" onClick={handleClose}>Cancel</Button>
              
              {/* Export button functionality (add logic as needed) */}
              <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
