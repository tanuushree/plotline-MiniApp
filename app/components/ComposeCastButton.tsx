import { useComposeCast } from '@coinbase/onchainkit/minikit';

type ComposeCastButtonProps = {
  points: number;
};

export default function ComposeCastButton({ points }: ComposeCastButtonProps) {
  const { composeCast } = useComposeCast();

  const handleCompose = () => {
    composeCast({
      text: `I scored ${points} points! Just minted an awesome NFT using @coinbase OnchainKit! 🚀`,
    });
  };

  const handleComposeWithEmbed = () => {
    composeCast({
      text: `I scored ${points} points! Check out this amazing frame!`,
      embeds: ['https://your-frame-url.com'],
    });
  };

  return (
    <div>
      <button onClick={handleCompose}>
        Share Achievement
      </button>
      <button onClick={handleComposeWithEmbed}>
        Share Frame
      </button>
    </div>
  );
}