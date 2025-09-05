using MINERD.Common.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;

namespace APP_VAC_PNI.Models
{
    public class ManejadorFormulario
    {
        private readonly Conexion conexion = new Conexion("Formulario");

        public List<EvaluacionesModel> getEvaluacionesXML()
        {
            List<EvaluacionesModel> evaluaciones = new List<EvaluacionesModel>();

            try
            {
                var result = conexion.GetDataTable("[dbo].[ObtenerGrupos]");

                foreach (DataRow row in result.Rows)
                {
                    var evaluacion = new EvaluacionesModel()
                    {
                        Titulo = row["GRUPO_PREGUNTA"].ToString(),
                    };

                    Parametro[] parametros = new Parametro[]
                    {
                        new Parametro("@Grupo", evaluacion.Titulo, DbType.String)
                    };

                    var preguntas = conexion.GetDataTable("[dbo].[ObtenerPreguntas]", null, parametros);

                    var listPregunta = new List<string>();
                    foreach (DataRow rw in preguntas.Rows)
                    {
                        listPregunta.Add(rw["PREGUNTA"].ToString());
                    }
                    evaluacion.Preguntas = listPregunta;
                    evaluaciones.Add(evaluacion);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                throw;
            }

            return evaluaciones;
        }

        public List<DocentesViewModel> ObtenerDocentesPorUsuario(string usuario)
        {
            var docente = new List<DocentesViewModel>();
            Parametro[] parametros = new Parametro[] {
                new Parametro ("@usuario", usuario, DbType.String)
            };

            DataTable dt = conexion.GetDataTable("dbo.prc_Obtiene_Docentes", null, parametros);

            if (dt.Rows.Count == 0) return new List<DocentesViewModel>();


            foreach (DataRow rw in dt.Rows)
            {
                docente.Add(new DocentesViewModel
                {
                    Id = rw["IdRespuerta"].ToString(),
                    CedulaDocente = rw["CedulaDocente"].ToString(),
                    NombreDocente = rw["NombreDocente"].ToString(),
                    Estado = rw["Estado"].ToString(),
                    FechaCreacion = rw["FechaCreacion"].ToString()
                });
            }
            return docente;
        }

        public bool dbSaveQuestions(RespuestaSeleccionada  respuestaSeleccionada)
        {
            //var dt = new DataTable();
            DbTransaction tran = conexion.BeginTransaction();
            try
            {
                Parametro[] pregunta = new Parametro[]
                    {
                        new Parametro("@CedulaDocente",respuestaSeleccionada.CedulaDocente, DbType.String),
                        new Parametro("@NombreDocente",respuestaSeleccionada.NombreDocente, DbType.String),
                        new Parametro("@Estado",respuestaSeleccionada.Estado, DbType.String),
                        new Parametro("@UsuarioEvaluador",respuestaSeleccionada.UsuarioEvaluador, DbType.String),
                        new Parametro("@TipoUsuario",respuestaSeleccionada.TipoUsuario, DbType.String)
                      };
                 int Identity = Convert.ToInt32(conexion.GetDataTable("[dbo].[prc_Inserta_Respuestas_Vac]", null, pregunta).Rows[0]["Identity"].ToString());

                foreach (var item in respuestaSeleccionada.PreguntaDetalles)
                {
                    Parametro[] parametros = new Parametro[]
                    {
                        new Parametro("@IdRespuerta",Identity, DbType.Int32),
                        new Parametro("@ValorRespuesta",Convert.ToInt32(item.ValorRespuesta), DbType.Int32),
                        new Parametro("@Pregunta ",item.Pregunta, DbType.String),
                    };
                   
                    conexion.GetDataTable("[dbo].[prc_Inserta_Pregunta_Detalle_Vac]", null, parametros);

                    parametros = null;
                }

                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return false;
            }
            return true;
        }

        public Docente ObtenerPersonaPadron(string cedula)
        {
            Parametro[] parametros = new Parametro[] {
                new Parametro ("@cedula", cedula.Replace("-",""), DbType.String)
            };

            DataTable dt = conexion.GetDataTable("dbo.pr_Participantes_Padron_Validador_PNI", null, parametros);

            if (dt.Rows.Count == 0) return null;

            Docente docente = new Docente
            {
                Cedula = dt.Rows[0]["Cedula"].ToString(),
                Nombres = dt.Rows[0]["Nombre"].ToString(),
                Apellidos = dt.Rows[0]["Apellidos"].ToString(),
                Centro = dt.Rows[0]["Centro"].ToString(),
                Regional = dt.Rows[0]["Regional"].ToString(),
                Distrito = dt.Rows[0]["Distrito"].ToString()
            };

            return docente;
        }

        public bool ValidarDocentePorUsuario(string cedula,string usuario)
        {
            Parametro[] parametros = new Parametro[] {
                new Parametro ("@usuario", usuario, DbType.String),
                new Parametro ("@cedulaDocente", cedula, DbType.String)
            };

            bool dt = Convert.ToBoolean(conexion.GetDataTable("dbo.prc_Valida_Entrevista", null, parametros).Rows[0]["activo"]);

            return dt;
        }

        public bool Login_Tutor(string clave, string usuario)
        {
            Parametro[] parametros = new Parametro[] {
                new Parametro ("@usuario", usuario, DbType.String),
                new Parametro ("@clave", clave, DbType.String)
            };

            bool dt = Convert.ToBoolean(conexion.GetDataTable("prc_Login_Tutor_Existe", null, parametros).Rows[0]["activo"]);

            return dt;
        }
    }
}