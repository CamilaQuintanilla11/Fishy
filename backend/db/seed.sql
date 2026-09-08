INSERT INTO rol (id, nombre, gatename) VALUES
  (UUID(), 'admin', 'admin_gate'),
  (UUID(), 'usuario', 'user_gate');

INSERT INTO estado (id, nombre) VALUES
  (UUID(), 'pendiente'),
  (UUID(), 'aprobado'),
  (UUID(), 'rechazado');