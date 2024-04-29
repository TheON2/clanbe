"use server";

import { getTeamData } from "@/service/user";

export async function getTeam() {
    return await getTeamData();
}
