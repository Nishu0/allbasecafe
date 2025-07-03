import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { BASE_CONTRACT_ADDRESS, PROJECT_VOTING_ABI } from '@/constant/contract';

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export async function POST(request: Request) {
  try {
    const { projectId, userAddress } = await request.json();
    
    // Read project data
    const projectData = await publicClient.readContract({
      address: BASE_CONTRACT_ADDRESS,
      abi: PROJECT_VOTING_ABI,
      functionName: 'getProject',
      args: [BigInt(projectId)],
    });
    
    let userVote = 0;
    if (userAddress) {
      // Read user vote if address provided
      const userVoteData = await publicClient.readContract({
        address: BASE_CONTRACT_ADDRESS,
        abi: PROJECT_VOTING_ABI,
        functionName: 'getVoteForProject',
        args: [BigInt(projectId), userAddress],
      });
      userVote = Number(userVoteData);
    }
    
    return NextResponse.json({
      totalLikes: Number(projectData[2]),
      totalDislikes: Number(projectData[3]),
      userVote: userVote
    });
  } catch (error) {
    console.error('Error reading contract:', error);
    return NextResponse.json({ 
      totalLikes: 0, 
      totalDislikes: 0, 
      userVote: 0 
    }, { status: 500 });
  }
} 