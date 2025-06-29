import { Player } from '@lottiefiles/react-lottie-player';
import avatarAnim from '../assets/avatar.json';

const LottieAvatar = () => (
  <div className="w-40 md:w-60 mx-auto mb-4">
    <Player autoplay loop src={avatarAnim} />
  </div>
);

export default LottieAvatar;
