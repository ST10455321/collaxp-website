import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Clapperboard, EyeOff, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteReel,
  getEventsByIds,
  getPlaybackUrls,
  listLinkableEvents,
  listOwnReels,
  setReelPublished,
  uploadReel,
} from "@/integrations/firebase/data";

export const Route = createFileRoute("/_authenticated/my-reels")({
  head: () => ({
    meta: [
      { title: "My Reels — COLLAXP" },
      {
        name: "description",
        content: "Upload, publish and remove your campus reels on COLLAXP.",
      },
      { property: "og:title", content: "My Reels — COLLAXP" },
      { property: "og:description", content: "Manage the reels you share on COLLAXP." },
    ],
  }),
  component: MyReels,
});

type OwnReel = {
  id: string;
  title: string;
  caption: string;
  video_url: string;
  event_id: string | null;
  is_published: boolean;
  created_at: string;
  playbackUrl: string;
  eventTitle: string | null;
};

function MyReels() {
  const { user, role } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [eventId, setEventId] = useState<string>("none");
  const [file, setFile] = useState<File | null>(null);

  const { data: events = [] } = useQuery({
    queryKey: ["reel-link-events", user?.id, role],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      // Organisers link their own events; students can link any published event.
      const rows = await listLinkableEvents(role, user!.id);
      return rows.map((e) => ({ id: e.id, title: e.title }));
    },
  });

  const { data: reels = [], isLoading } = useQuery({
    queryKey: ["my-reels", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async (): Promise<OwnReel[]> => {
      const data = await listOwnReels(user!.id);
      if (data.length === 0) return [];

      const eventIds = [...new Set(data.map((r) => r.event_id).filter(Boolean))] as string[];
      const [eventDocs, playbackMap] = await Promise.all([
        eventIds.length ? getEventsByIds(eventIds) : Promise.resolve(new Map()),
        getPlaybackUrls(data.map((r) => r.video_url)),
      ]);
      return data.map((r) => ({
        id: r.id,
        title: r.title,
        caption: r.caption,
        video_url: r.video_url,
        event_id: r.event_id,
        is_published: r.is_published,
        created_at: r.created_at,
        playbackUrl: playbackMap.get(r.video_url) ?? "",
        eventTitle: r.event_id ? (eventDocs.get(r.event_id)?.title ?? null) : null,
      }));
    },
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["my-reels"] });
    void queryClient.invalidateQueries({ queryKey: ["reels-feed"] });
  };

  const upload = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Choose a video file first");
      if (!title.trim()) throw new Error("Give the reel a title");
      if (file.size > 100 * 1024 * 1024) throw new Error("Video must be under 100 MB");

      await uploadReel({
        uid: user!.id,
        file,
        title: title.trim(),
        caption: caption.trim(),
        eventId: eventId === "none" ? null : eventId,
      });
    },
    onSuccess: () => {
      toast.success("Reel published", { description: "It's live in the Reels feed." });
      setOpen(false);
      setTitle("");
      setCaption("");
      setEventId("none");
      setFile(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const togglePublish = useMutation({
    mutationFn: ({ id, next }: { id: string; next: boolean }) => setReelPublished(id, next),
    onSuccess: () => {
      toast.success("Reel updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (reel: OwnReel) => deleteReel(reel),
    onSuccess: () => {
      toast.success("Reel deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">My reels</p>
          <h1 className="mt-1 text-3xl sm:text-4xl">Your reels</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Share campus moments with everyone.{" "}
            <Link to="/reels" className="text-primary hover:underline">
              Back to the feed
            </Link>
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload reel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Upload a reel</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                upload.mutate();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="reel-title">Title</Label>
                <Input
                  id="reel-title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-surface-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reel-caption">Caption</Label>
                <Textarea
                  id="reel-caption"
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="bg-surface-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reel-event">Linked event (optional)</Label>
                <Select value={eventId} onValueChange={setEventId}>
                  <SelectTrigger id="reel-event" className="bg-surface-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No linked event</SelectItem>
                    {events.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reel-file">Video file (MP4/WebM, max 100 MB)</Label>
                <Input
                  id="reel-file"
                  type="file"
                  accept="video/*"
                  required
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="bg-surface-2"
                />
              </div>
              <Button type="submit" className="w-full" disabled={upload.isPending}>
                {upload.isPending ? "Uploading…" : "Publish reel"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Reveal>

      {isLoading ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="panel h-64 animate-pulse" />
          ))}
        </div>
      ) : reels.length === 0 ? (
        <Reveal className="panel mt-8 p-10 text-center">
          <Clapperboard className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-3 font-display text-lg">No reels yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload your first campus reel — everyone will see it in the Reels feed.
          </p>
        </Reveal>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel, i) => (
            <Reveal key={reel.id} delay={Math.min(i, 6) * 60} className="panel overflow-hidden">
              <div className="aspect-video bg-black">
                <video
                  src={reel.playbackUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="space-y-2 p-4">
                <p className="truncate font-display text-base">{reel.title}</p>
                <p className="text-xs text-muted-foreground">
                  {reel.eventTitle ? `Event: ${reel.eventTitle}` : "No linked event"}
                  {!reel.is_published && " · hidden"}
                </p>
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      togglePublish.mutate({ id: reel.id, next: !reel.is_published })
                    }
                  >
                    <EyeOff className="mr-2 h-3.5 w-3.5" />
                    {reel.is_published ? "Hide" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Delete reel"
                    onClick={() => remove.mutate(reel)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
