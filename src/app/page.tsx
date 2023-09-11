import { Text } from '@/components/Text'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-lg">
      <Text className="mb-6 text-center text-4xl capitalize" variant="gradient">
        Exterminando a filariose
      </Text>

      <Text className="text-xl font-bold">Você sabe o que é filariose linfática?</Text>
      <Text className="mb-6">
        Descubra mais sobre essa doença embarcando em uma aventura junto com um amigo, teste seus conhecimentos e ajude
        uma comunidade a exterminar esse mal.
      </Text>

      <Text className="mb-6">
        Faixa etária: 16+.
        <br />
        De dois a três participantes.
      </Text>

      <Text className="mb-1 font-bold">Componentes do jogo:</Text>
      <ul className="mb-6 space-y-1">
        <li>-Um tabuleiro.</li>
        <li>-Um dado.</li>
        <li>-Três peões.</li>
        <li>-Site de acesso do conteúdo interativo (perguntas e respostas).</li>
      </ul>

      <Text className="mb-1 font-bold">Instruções de jogo:</Text>
      <ul className="mb-6 space-y-2">
        <li>
          1-Cada jogador seleciona um peão e lança o dado. O participante que obtiver a maior numeração começa a
          partida.
        </li>
        <li>
          2- A cada rodada os jogadores devem responder perguntas disponíveis no site{' '}
          <Link className="text-indigo-500 dark:text-indigo-400" href="https://cardsquiz.vercel.app/">
            https://cardsquiz.vercel.app/
          </Link>{' '}
          para assim poder avançar nas casas do tabuleiro.
        </li>
        <li>3- Se o jogador errar uma sequência de 3 perguntas, fica uma rodada sem jogar.</li>
        <li>
          4- O objetivo do jogo é livrar cada uma das estações da Filariose linfática. Vence o jogador que completar o
          trajeto primeiro.
        </li>
      </ul>

      <div className="flex justify-center">
        <Link
          href="/games"
          className="rounded-lg bg-gradient-to-br from-indigo-700 to-sky-400 px-6 py-3 text-white shadow-lg shadow-black/30 hover:scale-105 active:scale-95 dark:from-violet-800 dark:from-15% dark:to-rose-400"
        >
          Jogar!
        </Link>
      </div>
    </div>
  )
}
