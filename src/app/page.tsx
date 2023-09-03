import { GlossaryText } from '@/components/GlossaryText'
import { Text } from '@/components/Text'

export default function Home() {
  return (
    <div>
      <Text className="text-5xl" variant="gradient">
        Nicole passa o texto pra essa parte fazofavor
      </Text>
      <GlossaryText>Nicole teste passa o texto pra essa parte fazofavor</GlossaryText>
    </div>
  )
}
