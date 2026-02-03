import ChatInput from "@/components/chat/ChatInput";
import AnalyticsArea from "@/components/analytics/AnalyticsArea";

export default function Home() {
  return (
    <div className="space-y-6">
      <ChatInput />
      <AnalyticsArea />
    </div>
  );
}
