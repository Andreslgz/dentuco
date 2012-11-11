app.views.Patient = {
    list : function (params) {
        /** @params
          * @params.data.patients : array com os pacientes a serem listados
          * @params.update : callback a ser chamado quando clicar em editar, recebe o paciente
          * @params.remove : callback a ser chamado quando clicar em excluir, recebe o paciente
          * @params.create : callback a ser chamado quando clicar em cadastrar
          */
    },
    update : function (params) {
        /** @params
          * @params.data.patient : paciente a ser editado
          * @params.confirm : callback a ser chamado quando clicar em salvar, recebe os dados do paciente
          * @params.cancel : callback a ser chamado quando clicar em cancelar
          */
    },
    remove : function (params) {
        /** @params
          * @params.data.patient : paciente a ser removido
          * @params.confirm : callback a ser chamado quando clicar em excluir, recebe o paciente
          * @params.cancel : callback a ser chamado quando clicar em cancelar
          */
    },
    create : function (params) {
        /** @params
          * @params.confirm : callback a ser chamado quando clicar em cadastrar, recebe os dados do paciente
          * @params.cancel : callback a ser chamado quando clicar em cancelar
          */
    }
}