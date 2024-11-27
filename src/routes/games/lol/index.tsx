import { invoke } from "@tauri-apps/api/core";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/games/lol/")({
  component: RouteComponent,
});

function bytesToBase64(bytes: Uint8Array) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join("");
  return btoa(binString);
}

function RouteComponent() {
  const [auth, setAuth] = useState<string | null>(null);

  async function getLeagueInfo() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const response = (await invoke(
      'find_league_client_command_line'
    )) as string;
    const token = response.match(/remoting-auth-token=(.*?)["'\s]/)?.[1];
    const port = response.match(/--app-port=(.*?)["'\s]/)?.[1];
    const auth = bytesToBase64(new TextEncoder().encode(`riot:${token}`));
    console.log(auth, port);
    setAuth(auth);
  }

  return (
    <>
      <Button onClick={getLeagueInfo}>Get League Info</Button>
      <div>Auth: {auth}</div>
    </>
  );
}
