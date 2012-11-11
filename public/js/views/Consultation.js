app.views.Consultation = {
    list : function (params) {
        /** @params
          * @params.data.consultations : array com as consultas a serem listadas
          * @params.create  : callback a ser chamado quando clicar em cadastrar
          * @params.details : callback a ser chamado quando clicar em exibir
          */
    },
    update : function (params) {
        /** @params
          * @params.data.consultation : consulta a ser editada
          * @params.confirm : callback a ser chamado quando clicar em salvar, recebe os dados da consulta
          * @params.cancel : callback a ser chamado quando clicar em cancelar
          */
    },
    remove : function (params) {
        /** @params
          * @params.data.consultation : consulta a ser removida
          * @params.confirm : callback a ser chamado quando clicar em excluir, recebe a consulta
          * @params.cancel : callback a ser chamado quando clicar em cancelar
          */
    },
    create : function (params) {
        /** @params
          * @params.confirm : callback a ser chamado quando clicar em cadastrar, recebe os dados da consulta
          * @params.cancel : callback a ser chamado quando clicar em cancelar
          */
    },
    details : function (params) {
        /** @params
          * @params.data.consultation : consulta a ser exibida
          * @params.update : callback a ser chamado quando clicar em editar, recebe a consulta
          * @params.remove : callback a ser chamado quando clicar em remover, recebe a consulta
          */
    }
}