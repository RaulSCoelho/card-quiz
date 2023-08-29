type Errors = {
  [key: string]: {
    [key: string]: string | undefined | unknown | null
  }
}

export const errors: Errors = {
  P2002: {
    Game_name_key: 'Não é possível criar dois jogos com o mesmo nome'
  }
}
