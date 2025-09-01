function servicetask154(attempt, message) {
    
    
    
    var token = {
            Login: "",
            Senha: "",
            UF: ""
    }
    
    // token_amei
    /*{
        "Success": true,
        "Message": "Autenticação realizada com sucesso!",
        "Data": {
            "Access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmY2JZUjNyMm5TNW9WdUVVMzhzZi1PbzRtWExoakJoNmJydDd4a1l2X01NIn0.eyJleHAiOjE2NTQ4MDEzNTAsImlhdCI6MTY1NDc5OTU1MCwianRpIjoiN2FlY2VmYmQtMjZiZi00ZjNhLTkwMjctMjkyZGI0M2EzYjM3IiwiaXNzIjoiaHR0cHM6Ly9hbWVpLWludGVybm8uc2VicmFlLmNvbS5ici9hdXRoL3JlYWxtcy9pbnRlcm5vIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAyMDJlMzY2LTMzMTUtNDlhYS05OTRjLTNlNTRjYzU3MjE5MiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFzc2luYXR1cmEtZGlnaXRhbCIsInNlc3Npb25fc3RhdGUiOiIwNTU2OWJkNi1mNTNkLTQyNTMtYTJmNy1lYjlkYjU1YWQ4N2MiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vc2dvbGl0ZS5zZWJyYWUuY29tLmJyIiwiaHR0cHM6Ly9hc3NpbmF0dXJhZGlnaXRhbC5zZWJyYWUuY29tLmJyIl0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGNwZiBpbmZvcm1hY29lcy1jb3Jwb3J0YXRpdmFzIGVtYWlsIHJvbGVzIGVtcHJlc2FzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNwZiI6IjAxMDc1Mzk2MTY2IiwibmFtZSI6IlNpbHZhaXIgRmVybmFuZGVzIEZyYXrDo28iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzaWx2YWlyLmZyYXphb0BtdC5zZWJyYWUuY29tLmJyIiwiZ2l2ZW5fbmFtZSI6IlNpbHZhaXIiLCJmYW1pbHlfbmFtZSI6IkZlcm5hbmRlcyBGcmF6w6NvIiwiZW1haWwiOiJzaWx2YWlyLmZyYXphb0BtdC5zZWJyYWUuY29tLmJyIn0.b0Ll0zrs9fGnx9vG9Rmew78x8Uo0wBEU1XHkisydvJUsjGV5WIS3p2jFnFg2mW_7-O4nnqJDJkpCAJN-ZZyjs-akNcaYMpbcWdJtBrJwh9b_RkbuZOqT_z4eN5JGqf3zdUA7xcIZWO9xhQ4OSbFQ-X4mQfOyDosvUUm-A4eo8MpxvLlCDIB1sbFL5HxjDgXlGIsl-pda_kQ_raK-HY6CEoB43wgm3P4xLbPdlqMD2Imvr5NHNGfs5VPhyc-vpqRQJADEqpsI84GwTJ3FkDhnuT11aq6SRsIAtISdzW5tdMHLHR342JbQ9GnA6brJFodTxMIA74ief0WwVi6NkBHJ8g",
            "Token_type": "Bearer",
            "Expires_In": 1800,
            "Refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkMjZiODdkYy0xZGZiLTRiM2EtOWIzZi0zYjRhMzA2ZjMxMDUifQ.eyJleHAiOjE2NTU2NjM1NTAsImlhdCI6MTY1NDc5OTU1MCwianRpIjoiMzg5YzAzODQtMDAyYS00YjUzLTgzYzMtMjA4MTJjYzdjODIyIiwiaXNzIjoiaHR0cHM6Ly9hbWVpLWludGVybm8uc2VicmFlLmNvbS5ici9hdXRoL3JlYWxtcy9pbnRlcm5vIiwiYXVkIjoiaHR0cHM6Ly9hbWVpLWludGVybm8uc2VicmFlLmNvbS5ici9hdXRoL3JlYWxtcy9pbnRlcm5vIiwic3ViIjoiMDIwMmUzNjYtMzMxNS00OWFhLTk5NGMtM2U1NGNjNTcyMTkyIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImFzc2luYXR1cmEtZGlnaXRhbCIsInNlc3Npb25fc3RhdGUiOiIwNTU2OWJkNi1mNTNkLTQyNTMtYTJmNy1lYjlkYjU1YWQ4N2MiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGNwZiBpbmZvcm1hY29lcy1jb3Jwb3J0YXRpdmFzIGVtYWlsIHJvbGVzIGVtcHJlc2FzIn0.m1c9ysyAOA355rvOXQRmeeBaFUFP_mif8pMX8q63sx8",
            "Refresh_Expires_In": "864000",
            "Session_State": "05569bd6-f53d-4253-a2f7-eb9db55ad87c",
            "IsSuccessful": false,
            "StatusCode": null,
            "StatusDescription": null,
            "Erro": {
                "Message": null,
                "ExceptionMessage": null,
                "ExceptionType": null,
                "StackTrace": null,
                "Error": null,
                "Error_Description": null
            }
        }
    }*/
    
    
    
    // verificar se há um consultor selecionado
    
    // caso não haja, buscar um consultor através de método do SGF
    
    // enviar dados para SGF

    // analisar se retorno de integração está enviando para o grupo, caso não esteja, providenciar o envio ou até criar um template
    
}