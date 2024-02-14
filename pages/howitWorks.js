import React from "react";

const HowItWorks = () => {
    return (
        <div className="h-full w-full flex justify-center items-center flex-col ">
            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-4xl font-bold md:text-5xl">How It Works</span>
                <span className="font-bold text-2xl">
                    Creating an equb is straightforward. Set your terms, invite members, and manage your savings collaboratively.
                </span>
                <span className="font-bold text-xl text-gray-400">
                    Welcome to Equb, where we blend traditional community savings with the security and innovation of blockchain technology. Manage your Equb effortlessly with MetaMask and Chainlink, ensuring fairness and transparency throughout the process.
                </span>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Step 1: Connect Your Wallet</span>
                <span>
                    Connect your MetaMask wallet to our platform with just a few clicks. Your wallet keeps your transactions secure and makes managing your Equb straightforward and safe.
                </span>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Step 2: Create Your Equb</span>
                <span>
                    Click on Create Equb to start setting up your savings circle.
                </span>
                <span className="font-bold">Define Terms:</span>
                <div>
                    <div className="flex gap-2 flex-col md:gap-1 md:flex-row">
                        <span className="font-bold">Total Members:</span>
                        <span>Choose the number of participants.</span>
                    </div>
                    <div className="flex gap-2 flex-col md:gap-1 md:flex-row">
                        <span className="font-bold">Duration & Frequency:</span>
                        <span>Set how long the Equb runs and the contribution intervals.</span>
                    </div>
                    <div className="flex gap-2 flex-col md:gap-1 md:flex-row">
                        <span className="font-bold">Contribution Amount:</span>
                        <span>Decide the individual contribution amount for each cycle.</span>
                    </div>
                    <div className="flex gap-2 flex-col md:gap-1 md:flex-row">
                        <span className="font-bold">Collateral:</span>
                        <span>Implement a collateral requirement to promote commitment.</span>
                    </div>
                </div>
            </div>


            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Step 3: Set Up Chainlink Subscription ID</span>
                <span >
                    To ensure a fair and random selection of cycle winners, our platform uses Chainlink VRF (Verifiable Random Function). For this:
                </span>
                <div className="flex gap-4 flex-col">
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">Obtain a Subscription ID:</span>
                        <span>Register your Equb as a consumer on the Chainlink VRF and receive a Subscription ID.
                        </span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">Enter Subscription ID:</span>
                        <span>Input this ID into the designated field during the Equb creation process.
                        </span>
                    </div>
                </div>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Step 4: Invite Members</span>
                <span >
                    Utilize your Equb link or directly invite members via their MetaMask addresses. Members can join by connecting their wallets and agreeing to the Equb terms.
                </span>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Step 5: Activate Chainlink Automation</span>
                <span >
                    Once your Equb is set and members are ready:
                </span>

                <div className="flex gap-4 flex-col">
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">Enable Chainlink Automation:</span>
                        <span>This feature will automatically request a random winner from Chainlink VRF at the end of each cycle, ensuring transparency and fairness.</span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">Monitor the Equb:</span>
                        <span>Keep an eye on contributions and cycles through your dashboard.</span>
                    </div>
                </div>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Step 6: Manage and Distribute</span>

                <div className="flex gap-4 flex-col">
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">Random Winner Selection:</span>
                        <span>At each cycles end, Chainlink VRF selects a random winner.
                        </span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">Distribution:</span>
                        <span>The total contributions are automatically sent to the winners wallet.</span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">Continue the Cycle:</span>
                        <span>The process repeats until all members have had a chance to win.
                        </span>
                    </div>
                </div>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Step 7: Complete the Equb</span>
                <span>After every member has received the pool once, the Equb concludes. You can choose to start another, join more, or simply enjoy the benefits of your collective savings.
                </span>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Understanding the Process:</span>
                <div className="flex gap-4 flex-col">
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">1. Random Winner Selection:</span>
                        <span>At each cycles end, Chainlink VRF selects a random winner.
                        </span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">2. Connect & Create:</span>
                        <span>Use MetaMask for secure interactions and set up your Equb.
                        </span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">3. Chainlink Integration:</span>
                        <span>Implement Chainlink VRF for winner selection and Chainlink Automation to manage cycles.
                        </span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">4. Invite & Participate:</span>
                        <span>Bring members on board and start your collective savings journey.
                        </span>
                    </div>
                    <div className="flex gap-1 flex-col">
                        <span className="font-bold">5. Automate & Conclude:</span>
                        <span>Let Chainlink handle the randomization and automation until the Equbs completion.
                        </span>
                    </div>
                </div>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Why Use MetaMask & Chainlink?</span>
                <div>
                    <div className="flex gap-1">
                        <span className="font-bold">Security:</span>
                        <span>MetaMask keeps your funds secure while interacting with the blockchain.
                        </span>
                    </div>
                    <div className="flex gap-1">
                        <span className="font-bold">Fairness:</span>
                        <span>Chainlink VRF ensures each winner is randomly and verifiably chosen.</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="font-bold">Automation:</span>
                        <span>Chainlink Automation manages the cycles, so you dont have to.</span>
                    </div>
                </div>
            </div>

            <div className="md:w-3/4 h-full flex flex-col space-y-6 p-7">
                <span className="text-2xl font-bold">Ready to Start?
                </span>
                <span >Connect your MetaMask, set up your Equb, and embark on a transparent and fair savings journey with your community!
                </span>

            </div>
        </div>
    )

}

export default HowItWorks;